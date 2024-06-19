const {
    createEmergencyEventDB,
    findEmergencyEventByIdDB,
    findEmergencyEventByUserDB,
    findEmergencyEventByUserDBIsDone,
    findEmergencyEventByUserDBIsNotDone,
    findEmergencyEventByDriverDB,
    findEmergencyEventByDriverDBIsDone,
    findEmergencyEventByDriverDBIsNotDone,
    findEmergencyEventByHospitalDB,
    findEmergencyEventByHospitalDBIsDone,
    findEmergencyEventByHospitalDBIsNotDone,
    updateDoneEmergencyEventDB
} = require('../repositories/emergencyevents.repository');
const {findAmbulanceProviderByIdDB, getAllAmbulanceProvidersDB, getAllAmbulanceProvidersByKotaDB} = require('../repositories/ambulanceproviders.repository');
const {distanceBetweenTwoPoints} = require('../helpers/distance.helper');
const {findAllProvinsiDB} = require('../repositories/provinsi.repository');
const {findAllKotaByProvinsiIdDB} = require('../repositories/kota.repository');

const {createHospitalDB, findHospitalByIdDB, findAllHospitalsByCityAndClassListDB} = require('../repositories/hospitals.repository');
const {getHospitalClassification} = require('../helpers/hospitalclassifications.helper');

const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const { all } = require('../routes/emergencyevents.routes');

const { getIo } = require('../sockets');

async function findNearestAmbulanceProvider(userLocation) {
    try {
    // Assume getAllAmbulanceProvidersDB() is a function that fetches all ambulanceproviders from the database
    const allProvinsi = await findAllProvinsiDB();
    let nearestProvinsi = [];

    // get two nearest provinsi
    allProvinsi.forEach(provinsi => {
        const provinsiCoordinates = provinsi.location.coordinates;
        const distance = distanceBetweenTwoPoints(userLocation.coordinates, provinsiCoordinates);

        if (nearestProvinsi.length < 2) {
        nearestProvinsi.push({provinsi, distance});
        } else {
        nearestProvinsi.sort((a, b) => a.distance - b.distance);
        if (distance < nearestProvinsi[1].distance) {
            nearestProvinsi[1] = {provinsi, distance};
        }
        }
    })

    // nearestProvinsi.forEach(provinsi => {
    //     console.log(provinsi.provinsi.name);
    //     console.log(provinsi.distance);
    // })
    let kotaIn2Provinsi = [];
    for (const provinsi of nearestProvinsi) {
        try {
            const kotaInProvinsi = await findAllKotaByProvinsiIdDB(provinsi.provinsi.id);
            // console.log(kotaInProvinsi);
            kotaIn2Provinsi.push(...kotaInProvinsi);
        } catch (error) {
            console.error(`Error fetching kota for provinsi ${provinsi.provinsi.id}:`, error);
        }
    }

    let nearestkota = [];

    // print all kota in 2 nearest provinsi
    kotaIn2Provinsi.forEach(kotaInProvinsi => {
        const kotaCoordinates = kotaInProvinsi.location.coordinates;
        const distance = distanceBetweenTwoPoints(userLocation.coordinates, kotaCoordinates);

        if (nearestkota.length < 2) {
        nearestkota.push({kotaInProvinsi, distance});
        } else {
        nearestkota.sort((a, b) => a.distance - b.distance);
        if (distance < nearestkota[1].distance) {
            nearestkota[1] = {kotaInProvinsi, distance};
        }
        }
    })

    // nearestkota.forEach(kota => {
    //     console.log(kota.kotaInProvinsi.name);
    // })
    let ambulanceproviderIn2Kota = [];
    for (const kota of nearestkota) {
        try {
            const ambulanceproviderInKota = await getAllAmbulanceProvidersByKotaDB(kota.kotaInProvinsi.id);
            // console.log(ambulanceproviderInKota);
            ambulanceproviderIn2Kota.push(...ambulanceproviderInKota);
        } catch (error) {
            console.error(`Error fetching ambulanceprovider for kota ${kota.kotaInProvinsi.id}:`, error);
        }
    }

    if (ambulanceproviderIn2Kota.length === 0) {
        throw new Error('No ambulanceproviders found in the database.');
    }

    let nearestAmbulanceProvider = null;
    let shortestDistance = Infinity;

    ambulanceproviderIn2Kota.forEach(ambulanceprovider => {
        const ambulanceproviderCoordinates = ambulanceprovider.location.coordinates;
        // console.log(ambulanceprovider.ambulance_provider_name)
        const distance = distanceBetweenTwoPoints(userLocation.coordinates, ambulanceproviderCoordinates);

        if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestAmbulanceProvider = ambulanceprovider;
        }
    });

    return nearestAmbulanceProvider;
    } catch (error) {
    console.error('Error finding nearest ambulanceProvider:', error);
    throw error;
    }
}

const findNearestHospital = async (userLocation, class_list) => {
    try {
        const allProvinsi = await findAllProvinsiDB();
        let nearestProvinsi = [];

        // get two nearest provinsi
        allProvinsi.forEach(provinsi => {
            const provinsiCoordinates = provinsi.location.coordinates;
            const distance = distanceBetweenTwoPoints(userLocation.coordinates, provinsiCoordinates);

            if (nearestProvinsi.length < 2) {
                nearestProvinsi.push({provinsi, distance});
            } else {
                nearestProvinsi.sort((a, b) => a.distance - b.distance);
                if (distance < nearestProvinsi[1].distance) {
                    nearestProvinsi[1] = {provinsi, distance};
                }
            }
        })

        let kotaIn2Provinsi = [];
        for (const provinsi of nearestProvinsi) {
            try {
                const kotaInProvinsi = await findAllKotaByProvinsiIdDB(provinsi.provinsi.id);
                // console.log(kotaInProvinsi);
                kotaIn2Provinsi.push(...kotaInProvinsi);
            } catch (error) {
                console.error(`Error fetching kota for provinsi ${provinsi.provinsi.id}:`, error);
            }
        }

        let nearestkota = [];

        // print all kota in 2 nearest provinsi
        kotaIn2Provinsi.forEach(kotaInProvinsi => {
            const kotaCoordinates = kotaInProvinsi.location.coordinates;
            const distance = distanceBetweenTwoPoints(userLocation.coordinates, kotaCoordinates);

            if (nearestkota.length < 2) {
                nearestkota.push({kotaInProvinsi, distance});
            } else {
                nearestkota.sort((a, b) => a.distance - b.distance);
                if (distance < nearestkota[1].distance) {
                    nearestkota[1] = {kotaInProvinsi, distance};
                }
            }
        })

        // nearestkota.forEach(kota => {
        //     console.log(kota.kotaInProvinsi.name);
        // })
        let hospitalIn2Kota = [];
        for (const kota of nearestkota) {
            try {
                // class_list = ['A', 'B', 'C', 'D', 'E'];
                // console.log(class_list)
                const hospitalInKota = await findAllHospitalsByCityAndClassListDB(kota.kotaInProvinsi.id, class_list);
                // console.log(hospitalInKota);
                hospitalIn2Kota.push(...hospitalInKota);
            } catch (error) {
                console.error(`Error fetching hospital for kota ${kota.kotaInProvinsi.id}:`, error);
            }
        }
        
        if (hospitalIn2Kota.length === 0) {
            throw new Error('No hospitals found in the database.');
        }

        let nearestHospital = null;
        let shortestDistance = Infinity;

        hospitalIn2Kota.forEach(hospital => {
            const hospitalCoordinates = hospital.location.coordinates;
            // console.log(hospital.hospital_name, hospital.kelas)
            const distance = distanceBetweenTwoPoints(userLocation.coordinates, hospitalCoordinates);

            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestHospital = hospital;
            }
        });
        return nearestHospital;
    }
    catch (error) {
        console.error('Error finding nearest hospital:', error);
        throw error;
    }
}

const createEmergencyEvent = async (user_id, user_location, emergency_type, number_of_patient, title, descriptions, res) => {

    const io = getIo();
    if (!io) {
        console.error("Socket.io not initialized");
        return;
    }

    try{
        if (!user_id || !user_location || !emergency_type){
            throw new FieldEmptyError("All fields are required");
        }

        let is_done = false;
        
        driver_id = null;
        hospital_id = null;

        // search nearest hospital
        // console.log(getHospitalClassification(emergency_type));
        const nearestHospital = await findNearestHospital(user_location, getHospitalClassification(emergency_type));
        // console.log(nearestHospital.id);

        const created = await createEmergencyEventDB(user_id, user_location, driver_id, nearestHospital.id, emergency_type, number_of_patient, title, descriptions, is_done);
        
        if(created.title == null){
            created.title = "No provided title";
        }

        if(created.descriptions == null){
            created.descriptions = "No provided descriptions";
        }

        //LOGIKA PENENTUAN AMBULANCE PROVIDER ID DAN DRIVER ID.

        // console.log(user_location.coordinates); //[longitude, latitude]
        // cari 2 provinsi terdekat terus 2 kota terdekat baru 1 rumah sakit terdekat

        // search for nearest ambulance provider
        const nearestAmbulanceProvider = await findNearestAmbulanceProvider(user_location);
        // console.log(nearestAmbulanceProvider.id);

        // GANTI PAKE FCM KE DRIVER

        // io.to(`hospital${nearestHospital.id}`).emit("emergency", {
        //     "emergency_event_id": created.id,
        //     "user_id": user_id,
        //     "user_location": user_location,
        //     "emergency_type": emergency_type,
        //     "number_of_patient": number_of_patient,
        //     "title": title,
        //     "descriptions": descriptions
        // })

        const success = new SuccessResponse("Emergency event acknowledge", {
            "emergency_event_id": created.id,
            "user_id": user_id,
            "user_location": user_location,
            "hospital_id": nearestHospital.id,
            "emergency_type": emergency_type,
            "number_of_patient": number_of_patient,
            "title": created.title,
            "descriptions": created.descriptions,
            "is_done": is_done,
            "message": "Emergency event acknowledge by server. Please wait for ambulance provider & driver to accept the emergency event. we will notify you when the event is accepted by hospital & driver from websocket.",
            "socket_event": "emergency"
        });

        // const success = new SuccessResponse("Emergency event created successfully", {
        //     "emergency_event_id": created.id,
        //     "user_id": created.user_id,
        //     "user_location": created.user_location,
        //     "driver_id": created.driver_id,
        //     "hospital_id": created.hospital_id,
        //     "emergency_type": created.emergency_type,
        //     "number_of_patient": created.number_of_patient,
        //     "title": created.title,
        //     "descriptions": created.descriptions,
        //     "is_done": created.is_done
        // });

        success.send201(res);
    } catch (error){
        throw error;
    }
}

const getAllUserEmergencyEvents = async (user_id, res) => {
    try{
        if (!user_id){
            throw new FieldEmptyError("User id is required");
        }

        const allUserEmergencyEvents = await findEmergencyEventByUserDB(user_id);

        const success = new SuccessResponse("All user emergency events", allUserEmergencyEvents);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const getAllUserEmergencyEventsIsDone = async (user_id, res) => {
    try{
        if (!user_id){
            throw new FieldEmptyError("User id is required");
        }

        const allUserEmergencyEventsIsDone = await findEmergencyEventByUserDBIsDone(user_id);

        const success = new SuccessResponse("All user emergency events is done", allUserEmergencyEventsIsDone);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const getAllUserEmergencyEventsIsNotDone = async (user_id, res) => {
    try{
        if (!user_id){
            throw new FieldEmptyError("User id is required");
        }

        const allUserEmergencyEventsIsNotDone = await findEmergencyEventByUserDBIsNotDone(user_id);

        const success = new SuccessResponse("All user emergency events is not done", allUserEmergencyEventsIsNotDone);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const getAllDriverEmergencyEvents = async (driver_id, res) => {
    try{
        if (!driver_id){
            throw new FieldEmptyError("Driver id is required");
        }

        const allDriverEmergencyEvents = await findEmergencyEventByDriverDB(driver_id);

        const success = new SuccessResponse("All driver emergency events", allDriverEmergencyEvents);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const getAllDriverEmergencyEventsIsDone = async (driver_id, res) => {
    try{
        if (!driver_id){
            throw new FieldEmptyError("Driver id is required");
        }

        const allDriverEmergencyEventsIsDone = await findEmergencyEventByDriverDBIsDone(driver_id);

        const success = new SuccessResponse("All driver emergency events is done", allDriverEmergencyEventsIsDone);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const getAllDriverEmergencyEventsIsNotDone = async (driver_id, res) => {
    try{
        if (!driver_id){
            throw new FieldEmptyError("Driver id is required");
        }

        const allDriverEmergencyEventsIsNotDone = await findEmergencyEventByDriverDBIsNotDone(driver_id);

        const success = new SuccessResponse("All driver emergency events is not done", allDriverEmergencyEventsIsNotDone);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

const updateDoneEmergencyEvent = async (driver_id, emergency_event_id, res) => {
    try{
        if (!emergency_event_id){
            throw new FieldEmptyError("Emergency event id is required");
        }

        const emergencyEvent = await findEmergencyEventByIdDB(emergency_event_id);
        if(emergencyEvent == null){
            throw new CustomError("Emergency event not found", 404);
        }

        if(emergencyEvent.driver_id != driver_id){
            throw new CustomError("Driver is not authorized to update this emergency event", 401);
        }

        if(emergencyEvent.is_done == true){
            throw new CustomError("Emergency event is already done", 400);
        }

        const updated = await updateDoneEmergencyEventDB(emergency_event_id);

        if(updated[0] == 0){
            throw new CustomError("Emergency event not found", 404);
        }

        const success = new SuccessResponse("Emergency event updated successfully", updated);

        success.send200(res);
    } catch (error){
        throw error;
    }
}

module.exports = {
    createEmergencyEvent,
    getAllUserEmergencyEvents,
    getAllUserEmergencyEventsIsDone,
    getAllUserEmergencyEventsIsNotDone,
    getAllDriverEmergencyEvents,
    getAllDriverEmergencyEventsIsDone,
    getAllDriverEmergencyEventsIsNotDone,
    updateDoneEmergencyEvent
}