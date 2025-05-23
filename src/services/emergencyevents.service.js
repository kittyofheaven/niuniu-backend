const {
  createEmergencyEventDB,
  findEmergencyEventByIdDB,
  findEmergencyEventByUserDB,
  findEmergencyEventByUserDBIsDone,
  findEmergencyEventByUserDBIsNotDone,
  findEmergencyEventByDriverDB,
  findEmergencyEventByDriverDBIsDone,
  findEmergencyEventByDriverDBIsNotDone,
  updateEmergencyEventDriverIdDB,
  updateDoneEmergencyEventDB,
  updateEmergencyTypeEmergencyEventDB,
  updateHospitalIdEmergencyEventDB,
  updateRatingEmergencyEventDB,
  getAllEmergencyEventDB,
} = require("../repositories/emergencyevents.repository");
const {
  findAmbulanceProviderByIdDB,
  getAllAmbulanceProvidersDB,
} = require("../repositories/ambulanceproviders.repository");
const {
  findUserAccountByIdDB,
} = require("../repositories/useraccounts.repository");
const {
  FindAllDriverByAmbulanceProviderDB,
  findDriverAccountByIdDB,
  updateIsOccupiedDriverDB,
} = require("../repositories/driveraccounts.repository");
const {
  createHospitalDB,
  findHospitalByIdDB,
} = require("../repositories/hospitals.repository");
const {
  getHospitalClassification,
} = require("../helpers/hospitalclassifications.helper");
const { findDriver, findNearestHospital } = require("../helpers/finder.helper");
const SuccessResponse = require("../middleware/success.middleware");
const {
  errorHandler,
  FieldEmptyError,
  CustomError,
} = require("../middleware/error.middleware");
const { getIo } = require("../sockets");
const { sendNotification } = require("../helpers/sendnotification.helper");
const { get } = require("../routes/provinsi.routes");

const createEmergencyEvent = async (
  user_id,
  user_location,
  number_of_patient,
  title,
  descriptions,
  res
) => {
  const io = getIo();
  if (!io) {
    console.error("Socket.io not initialized");
    return;
  }

  try {
    if (!user_id || !user_location) {
      throw new FieldEmptyError("All fields are required");
    }

    let is_done = false;

    driver_id = null;
    hospital_id = null;
    emergency_type = null;

    const created = await createEmergencyEventDB(
      user_id,
      user_location,
      driver_id,
      hospital_id,
      emergency_type,
      number_of_patient,
      title,
      descriptions,
      is_done
    );
    const useraccount = await findUserAccountByIdDB(user_id);
    let name = useraccount.first_name + " " + useraccount.last_name;

    if (created.title == null) {
      created.title = "No provided title";
    }

    if (created.descriptions == null) {
      created.descriptions = "No provided descriptions";
    }

    //LOGIKA PENENTUAN AMBULANCE PROVIDER ID DAN DRIVER ID.

    findDriver(user_location, created.id);

    const success = new SuccessResponse("Emergency event acknowledge", {
      emergency_event_id: created.id,
      user_id: user_id,
      user_location: user_location,
      emergency_type: emergency_type,
      number_of_patient: number_of_patient,
      title: created.title,
      descriptions: created.descriptions,
      is_done: is_done,
      message:
        "Emergency event acknowledge by server. Please wait for ambulance provider & driver to accept the emergency event. we will notify you when the event is accepted by hospital & driver from websocket.",
      socket_event: "emergency",
    });

    success.send201(res);
  } catch (error) {
    throw error;
  }
};

const getAllUserEmergencyEvents = async (user_id, res) => {
  try {
    if (!user_id) {
      throw new FieldEmptyError("User id is required");
    }

    const allUserEmergencyEvents = await findEmergencyEventByUserDB(user_id);

    const success = new SuccessResponse(
      "All user emergency events",
      allUserEmergencyEvents
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllUserEmergencyEventsIsDone = async (user_id, res) => {
  try {
    if (!user_id) {
      throw new FieldEmptyError("User id is required");
    }

    const allUserEmergencyEventsIsDone = await findEmergencyEventByUserDBIsDone(
      user_id
    );

    const success = new SuccessResponse(
      "All user emergency events is done",
      allUserEmergencyEventsIsDone
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllUserEmergencyEventsIsNotDone = async (user_id, res) => {
  try {
    if (!user_id) {
      throw new FieldEmptyError("User id is required");
    }

    const allUserEmergencyEventsIsNotDone =
      await findEmergencyEventByUserDBIsNotDone(user_id);

    const success = new SuccessResponse(
      "All user emergency events is not done",
      allUserEmergencyEventsIsNotDone
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllDriverEmergencyEvents = async (driver_id, res) => {
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver id is required");
    }

    const allDriverEmergencyEvents = await findEmergencyEventByDriverDB(
      driver_id
    );

    const success = new SuccessResponse(
      "All driver emergency events",
      allDriverEmergencyEvents
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllDriverEmergencyEventsIsDone = async (driver_id, res) => {
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver id is required");
    }

    const allDriverEmergencyEventsIsDone =
      await findEmergencyEventByDriverDBIsDone(driver_id);

    const success = new SuccessResponse(
      "All driver emergency events is done",
      allDriverEmergencyEventsIsDone
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllDriverEmergencyEventsIsNotDone = async (driver_id, res) => {
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver id is required");
    }

    const allDriverEmergencyEventsIsNotDone =
      await findEmergencyEventByDriverDBIsNotDone(driver_id);

    const success = new SuccessResponse(
      "All driver emergency events is not done",
      allDriverEmergencyEventsIsNotDone
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const updateDoneEmergencyEvent = async (driver_id, emergency_event_id, res) => {
  try {
    if (!emergency_event_id) {
      throw new FieldEmptyError("Emergency event id is required");
    }

    const emergencyEvent = await findEmergencyEventByIdDB(emergency_event_id);
    if (emergencyEvent == null) {
      throw new CustomError("Emergency event not found", 404);
    }

    if (emergencyEvent.is_canceled == true) {
      throw new CustomError("Emergency event is already canceled", 400);
    }

    if (emergencyEvent.driver_id != driver_id) {
      throw new CustomError(
        "Driver is not authorized to update this emergency event",
        401
      );
    }

    updateIsOccupiedDriverDB(driver_id, 0);

    if (emergencyEvent.is_done == true) {
      throw new CustomError("Emergency event is already done", 400);
    }

    const updated = await updateDoneEmergencyEventDB(emergency_event_id);

    if (updated[0] == 0) {
      throw new CustomError("Emergency event not found", 404);
    }

    const success = new SuccessResponse(
      "Emergency event updated successfully",
      updated
    );

    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const updateEmergencyEventDriverId = async (id, driver_id, res) => {
  try {
    if (!id || !driver_id) {
      throw new FieldEmptyError("All fields are required");
    }

    if (isNaN(id) || isNaN(driver_id)) {
      throw new CustomError("All fields must be a number", 400);
    }

    const emergencyEvent = await findEmergencyEventByIdDB(id);

    if (emergencyEvent == null) {
      throw new CustomError("Emergency event not found", 404);
    }

    if (emergencyEvent.is_canceled == true) {
      throw new CustomError("Emergency event is already canceled", 400);
    }

    if (emergencyEvent.driver_id != null) {
      throw new CustomError("Emergency event already has driver", 400);
    }

    updateIsOccupiedDriverDB(driver_id, 1);
    const driver = await findDriverAccountByIdDB(driver_id);
    let ambulance_provider_id = driver.ambulance_provider_id;

    const updated = await updateEmergencyEventDriverIdDB(
      id,
      driver_id,
      ambulance_provider_id
    );
    // send fcm
    const user = emergencyEvent.user_emergencyEvents;
    const user_fcm_token = user.fcm_token;

    const message = {
      notification: {
        title: "Driver Found",
        body: "Driver has been found, please wait for further action",
      },
      data: {
        title: "Driver Found",
        body: JSON.stringify({
          emergency_event_id: id,
          user_id: user.id,
          user_name: user.first_name + " " + user.last_name,
          user_location: emergencyEvent.user_location,
          driver_id: driver_id,
          driver_name: driver.first_name + " " + driver.last_name,
          driver_phone_number: driver.phone_number,
          ambulance_provider_id: ambulance_provider_id,
          emergency_type: emergencyEvent.emergency_type,
          number_of_patient: emergencyEvent.number_of_patient,
          title: emergencyEvent.title,
          descriptions: emergencyEvent.descriptions,
        }),
      },
      token: user_fcm_token,
    };

    try {
      const result = await sendNotification(message);
      if (result.success) {
        console.log("Successfully sent message:", result.response);
      } else {
        console.error("Error sending message:", result.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    const success = new SuccessResponse(
      "Emergency event updated successfully",
      updated
    );
    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const updateEmergencyTypeEmergencyEvent = async (
  driver_id,
  emergency_id,
  emergency_type,
  res
) => {
  try {
    if (!emergency_id || !emergency_type) {
      throw new FieldEmptyError("All fields are required");
    }

    if (isNaN(emergency_id)) {
      throw new CustomError("All fields must be a number", 400);
    }

    const emergencyEvent = await findEmergencyEventByIdDB(emergency_id);

    if (emergencyEvent == null) {
      throw new CustomError("Emergency event not found", 404);
    }

    if (emergencyEvent.driver_id != driver_id) {
      throw new CustomError(
        "Driver is not authorized to update this emergency event",
        401
      );
    }

    if (emergencyEvent.is_done == true) {
      throw new CustomError("Emergency event is already done", 400);
    }

    const user_id = emergencyEvent.user_id;
    const user_location = emergencyEvent.user_location;
    const useraccount = await findUserAccountByIdDB(user_id);
    let user_name = useraccount.first_name + " " + useraccount.last_name;

    const updated = await updateEmergencyTypeEmergencyEventDB(
      emergency_id,
      emergency_type
    );

    const nearestHospital = await findNearestHospital(
      user_location,
      getHospitalClassification(emergency_type)
    );

    await updateHospitalIdEmergencyEventDB(emergency_id, nearestHospital.id);

    if (useraccount.fcm_token != null) {
      const message = {
        notification: {
          title: "Hospital Found",
          body: "Hospital has been found, please proceed to the hospital for further action",
        },
        data: {
          title: "Hospital Found",
          body: JSON.stringify({
            emergency_event_id: emergency_id,
            user_id: user_id,
            user_name: user_name,
            user_location: user_location,
            driver_name:
              emergencyEvent.driver_emergencyEvents.first_name +
              " " +
              emergencyEvent.driver_emergencyEvents.last_name,
            driver_phone_number:
              emergencyEvent.driver_emergencyEvents.phone_number,
            hospital_name: nearestHospital.hospital_name,
            hospital_location: nearestHospital.location,
            emergency_type: emergency_type,
            number_of_patient: emergencyEvent.number_of_patient,
            title: emergencyEvent.title,
            descriptions: emergencyEvent.descriptions,
          }),
        },
        token: useraccount.fcm_token,
      };

      const result = await sendNotification(message);
      if (result.success) {
        console.log("Successfully sent message:", result.response);
      } else {
        console.error("Error sending message:", result.error);
      }
    }

    const response = {
      emergency_event_id: emergency_id,
      user_id: user_id,
      user_name: user_name,
      user_phone_number: useraccount.phone_number,
      user_location: user_location,
      hospital_name: nearestHospital.hospital_name,
      hospital_location: nearestHospital.location,
      emergency_type: emergency_type,
      number_of_patient: emergencyEvent.number_of_patient,
      title: emergencyEvent.title,
      descriptions: emergencyEvent.descriptions,
      is_done: emergencyEvent.is_done,
      message:
        "Emergency event updated successfully. Hospital has been found, please proceed to the hospital for further action",
      updated: updated,
    };

    const success = new SuccessResponse(
      "Emergency event updated successfully",
      response
    );
    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const updateRatingEmergencyEvent = async (
  user_id,
  emergency_event_id,
  rating,
  res
) => {
  try {
    if (!emergency_event_id || !rating) {
      throw new FieldEmptyError("All fields are required");
    }

    if (isNaN(emergency_event_id) || isNaN(rating)) {
      throw new CustomError("All fields must be a number", 400);
    }

    const emergencyEvent = await findEmergencyEventByIdDB(emergency_event_id);

    if (emergencyEvent == null) {
      throw new CustomError("Emergency event not found", 404);
    }

    if (emergencyEvent.user_id != user_id) {
      throw new CustomError(
        "User is not authorized to update this emergency event",
        401
      );
    }

    if (emergencyEvent.is_done == false) {
      throw new CustomError("Emergency event is not done yet", 400);
    }

    const updated = await updateRatingEmergencyEventDB(
      emergency_event_id,
      rating
    );

    const success = new SuccessResponse("Rating updated successfully", updated);
    success.send200(res);
  } catch (error) {
    throw error;
  }
};

const getAllEmergencyEvents = async (page, limit, filterParams, res) => {
  try {
    const allEmergencyEvents = await getAllEmergencyEventDB(
      page,
      limit,
      filterParams
    );

    const success = new SuccessResponse(
      "All emergency events",
      allEmergencyEvents
    );
    success.send200(res);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmergencyEvent,
  getAllUserEmergencyEvents,
  getAllUserEmergencyEventsIsDone,
  getAllUserEmergencyEventsIsNotDone,
  getAllDriverEmergencyEvents,
  getAllDriverEmergencyEventsIsDone,
  getAllDriverEmergencyEventsIsNotDone,
  updateDoneEmergencyEvent,
  updateEmergencyEventDriverId,
  updateEmergencyTypeEmergencyEvent,
  updateRatingEmergencyEvent,
  getAllEmergencyEvents,
};
