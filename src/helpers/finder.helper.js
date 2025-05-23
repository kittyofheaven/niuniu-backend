const { findAllProvinsiDB } = require("../repositories/provinsi.repository");
const {
  findAllKotaByProvinsiIdDB,
} = require("../repositories/kota.repository");
const {
  getAllAmbulanceProvidersByKotaDB,
} = require("../repositories/ambulanceproviders.repository");
const {
  findAllHospitalsByCityAndClassListDB,
} = require("../repositories/hospitals.repository");
const {
  findEmergencyEventByIdDB,
  updateCancelEmergencyEventDB,
} = require("../repositories/emergencyevents.repository");
const {
  distanceBetweenTwoPoints,
  distanceBetweenTwoPointsInKm,
} = require("../helpers/distance.helper");
const { sendNotification } = require("../helpers/sendnotification.helper");
const {
  FindAllDriverByAmbulanceProviderDB,
} = require("../repositories/driveraccounts.repository");

const findNearestHospital = async (userLocation, class_list) => {
  try {
    const allProvinsi = await findAllProvinsiDB();
    let nearestProvinsi = [];

    allProvinsi.forEach((provinsi) => {
      const provinsiCoordinates = provinsi.location.coordinates;
      const distance = distanceBetweenTwoPoints(
        userLocation.coordinates,
        provinsiCoordinates
      );

      if (nearestProvinsi.length < 2) {
        nearestProvinsi.push({ provinsi, distance });
      } else {
        nearestProvinsi.sort((a, b) => a.distance - b.distance);
        if (distance < nearestProvinsi[1].distance) {
          nearestProvinsi[1] = { provinsi, distance };
        }
      }
    });

    let kotaIn2Provinsi = [];
    for (const provinsi of nearestProvinsi) {
      try {
        const kotaInProvinsi = await findAllKotaByProvinsiIdDB(
          provinsi.provinsi.id
        );
        kotaIn2Provinsi.push(...kotaInProvinsi);
      } catch (error) {
        console.error(
          `Error fetching kota for provinsi ${provinsi.provinsi.id}:`,
          error
        );
      }
    }

    let nearestKota = [];
    kotaIn2Provinsi.forEach((kotaInProvinsi) => {
      const kotaCoordinates = kotaInProvinsi.location.coordinates;
      const distance = distanceBetweenTwoPoints(
        userLocation.coordinates,
        kotaCoordinates
      );

      if (nearestKota.length < 2) {
        nearestKota.push({ kotaInProvinsi, distance });
      } else {
        nearestKota.sort((a, b) => a.distance - b.distance);
        if (distance < nearestKota[1].distance) {
          nearestKota[1] = { kotaInProvinsi, distance };
        }
      }
    });

    let hospitalIn2Kota = [];
    for (const kota of nearestKota) {
      try {
        const hospitalInKota = await findAllHospitalsByCityAndClassListDB(
          kota.kotaInProvinsi.id,
          class_list
        );
        hospitalIn2Kota.push(...hospitalInKota);
      } catch (error) {
        console.error(
          `Error fetching hospital for kota ${kota.kotaInProvinsi.id}:`,
          error
        );
      }
    }

    if (hospitalIn2Kota.length === 0) {
      throw new Error("No hospitals found in the database.");
    }

    let nearestHospital = null;
    let shortestDistance = Infinity;

    hospitalIn2Kota.forEach((hospital) => {
      const hospitalCoordinates = hospital.location.coordinates;
      const distance = distanceBetweenTwoPoints(
        userLocation.coordinates,
        hospitalCoordinates
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestHospital = hospital;
      }
    });
    return nearestHospital;
  } catch (error) {
    console.error("Error finding nearest hospital:", error);
    throw error;
  }
};

async function findNearestAmbulanceProviders(userLocation, n = 1) {
  try {
    const allProvinsi = await findAllProvinsiDB();
    let nearestProvinsi = [];

    allProvinsi.forEach((provinsi) => {
      const provinsiCoordinates = provinsi.location.coordinates;
      const distance = distanceBetweenTwoPoints(
        userLocation.coordinates,
        provinsiCoordinates
      );

      if (nearestProvinsi.length < 2) {
        nearestProvinsi.push({ provinsi, distance });
      } else {
        nearestProvinsi.sort((a, b) => a.distance - b.distance);
        if (distance < nearestProvinsi[1].distance) {
          nearestProvinsi[1] = { provinsi, distance };
        }
      }
    });

    let kotaIn2Provinsi = [];
    for (const provinsi of nearestProvinsi) {
      try {
        const kotaInProvinsi = await findAllKotaByProvinsiIdDB(
          provinsi.provinsi.id
        );
        kotaIn2Provinsi.push(...kotaInProvinsi);
      } catch (error) {
        console.error(
          `Error fetching kota for provinsi ${provinsi.provinsi.id}:`,
          error
        );
      }
    }

    let nearestKota = [];
    kotaIn2Provinsi.forEach((kotaInProvinsi) => {
      const kotaCoordinates = kotaInProvinsi.location.coordinates;
      const distance = distanceBetweenTwoPoints(
        userLocation.coordinates,
        kotaCoordinates
      );

      if (nearestKota.length < 2) {
        nearestKota.push({ kotaInProvinsi, distance });
      } else {
        nearestKota.sort((a, b) => a.distance - b.distance);
        if (distance < nearestKota[1].distance) {
          nearestKota[1] = { kotaInProvinsi, distance };
        }
      }
    });

    let ambulanceProvidersIn2Kota = [];
    for (const kota of nearestKota) {
      try {
        const ambulanceProvidersInKota = await getAllAmbulanceProvidersByKotaDB(
          kota.kotaInProvinsi.id
        );
        ambulanceProvidersIn2Kota.push(...ambulanceProvidersInKota);
      } catch (error) {
        console.error(
          `Error fetching ambulance provider for kota ${kota.kotaInProvinsi.id}:`,
          error
        );
      }
    }

    if (ambulanceProvidersIn2Kota.length === 0) {
      throw new Error("No ambulance providers found in the database.");
    }

    let ambulanceProvidersWithDistances = ambulanceProvidersIn2Kota.map(
      (provider) => {
        const providerCoordinates = provider.location.coordinates;
        const distance = distanceBetweenTwoPoints(
          userLocation.coordinates,
          providerCoordinates
        );
        return { provider, distance };
      }
    );

    ambulanceProvidersWithDistances.sort((a, b) => a.distance - b.distance);

    return ambulanceProvidersWithDistances
      .slice(0, n)
      .map((item) => item.provider);
  } catch (error) {
    // console.error('Error finding nearest ambulance providers:', error);
    throw error;
  }
}

const checkIfDriverHasBeenFound = async (emergency_event_id) => {
  const emergencyEvent = await findEmergencyEventByIdDB(emergency_event_id);
  return emergencyEvent.driver_id !== null;
};

const pollForDriverAcceptance = (emergency_event_id, timeout, interval) => {
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(async () => {
      const driverFound = await checkIfDriverHasBeenFound(emergency_event_id);
      if (driverFound) {
        clearInterval(checkInterval);
        clearTimeout(timeoutHandle);
        resolve(true);
      }
    }, interval);

    const timeoutHandle = setTimeout(() => {
      clearInterval(checkInterval);
      resolve(false);
    }, timeout);
  });
};

const findDriver = async (user_location, emergency_event_id) => {
  let tries = 0;
  const timeout = 180000; // 180 seconds
  const interval = 1000; // 1 second

  const emergencyEvent = await findEmergencyEventByIdDB(emergency_event_id);
  const user_name =
    emergencyEvent.user_emergencyEvents.first_name +
    " " +
    emergencyEvent.user_emergencyEvents.last_name;

  try {
    while (true) {
      let nearestAmbulanceProvider;
      try {
        // Find the nearest ambulance providers
        const nearestAmbulanceProviders = await findNearestAmbulanceProviders(
          user_location,
          tries + 1
        );
        nearestAmbulanceProvider = nearestAmbulanceProviders[tries];
        if (!nearestAmbulanceProvider) {
          throw new Error("None of the ambulance providers accepted.");
        }

        if (
          distanceBetweenTwoPointsInKm(
            user_location.coordinates,
            nearestAmbulanceProvider.location.coordinates
          ) > 10
        ) {
          const message = {
            notification: {
              title: "Emergency Event",
              body: "No nearby ambulance providers within 10km.",
            },
            data: {
              status: "404",
              title: "Emergency Event",
              body: "No nearby ambulance providers within 10km.",
            },
            token: emergencyEvent.user_emergencyEvents.fcm_token,
          };
          await sendNotification(message);
          throw new Error("No nearby ambulance providers within 10km.");
        }
      } catch (error) {
        console.error("Error finding nearest ambulance providers:", error);
        throw error; // Exit the loop and function if there are no nearby providers
      }

      try {
        // Get all drivers for the nearest ambulance provider
        const allDrivers = await FindAllDriverByAmbulanceProviderDB(
          nearestAmbulanceProvider.id
        );

        if (allDrivers.length === 0) {
          throw new Error(
            `No drivers found for the ambulance provider (ambulance_provider_id: ${nearestAmbulanceProvider.id})`
          );
        }

        for (const driver of allDrivers) {
          if (driver.is_occupied) {
            console.log(`Driver ${driver.id} is occupied, skipping...`);
            continue;
          }

          if (driver.fcm_token === null) {
            console.log(
              `Driver ${driver.id} does not have an FCM token, skipping...`
            );
            continue;
          }

          const message = {
            notification: {
              title: "Emergency Event",
              body: "Someone needs an ambulance, please accept the emergency event",
            },
            data: {
              status: "200",
              title: "Emergency Event",
              body: JSON.stringify({
                emergency_event_id: emergency_event_id,
                user_name: user_name,
                user_phone_number:
                  emergencyEvent.user_emergencyEvents.phone_number,
                user_location: user_location,
                number_of_patient: emergencyEvent.number_of_patient,
                descriptions: emergencyEvent.descriptions,
              }),
            },
            token: driver.fcm_token,
          };

          const result = await sendNotification(message);

          if (!result.success) {
            console.error("Error sending message to driver:", result.error);
            continue;
            // throw new Error("Error sending message to driver");
          }
        }

        const driverAccepted = await pollForDriverAcceptance(
          emergency_event_id,
          timeout,
          interval
        );

        if (driverAccepted) {
          console.log("Driver has been found!");
          return;
        } else {
          console.log(
            "Timeout: Driver not found within the specified time. Trying again with next provider..."
          );
          tries += 1;
        }
      } catch (error) {
        console.error("Error during driver notification or polling:", error);
        tries += 1; // Move to the next provider in case of any error in this block
      }
    }
  } catch (error) {
    // Send error notification to user
    const message = {
      notification: {
        title: "Emergency Event",
        body: `No drivers found for the emergency event`,
      },
      data: {
        status: "404",
        title: "Emergency Event",
        body: JSON.stringify({
          emergency_event_id: emergency_event_id,
          user_name: user_name,
          user_location: user_location,
          message: "No drivers found for the emergency event",
          error: `${error.message}`,
        }),
      },
      token: emergencyEvent.user_emergencyEvents.fcm_token,
    };

    try {
      const sent = await sendNotification(message);
      if (!sent.success) {
        console.error("Error sending notification to user:", sent.error);
        throw new Error("Error sending notification to user");
      }
    } catch (notificationError) {
      console.error("Error sending notification to user:", notificationError);
    }

    // Update the emergency event as cancelled
    try {
      await updateCancelEmergencyEventDB(emergency_event_id);
    } catch (dbError) {
      console.error(
        "Error updating the emergency event as cancelled:",
        dbError
      );
    }

    console.error("Error finding nearest driver:", error);
  }
};

module.exports = {
  findNearestAmbulanceProviders,
  findNearestHospital,
  findDriver,
};
