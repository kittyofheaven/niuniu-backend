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
const {findHospitalAccountByIdDB, getAllHospitalAccountsDB, getAllHospitalAccountsByKotaDB} = require('../repositories/hospitalaccounts.repository');
const {distanceBetweenTwoPoints} = require('../helpers/distance.helper');
const {findAllProvinsiDB} = require('../repositories/provinsi.repository');
const {findAllKotaByProvinsiIdDB} = require('../repositories/kota.repository');

const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const { all } = require('../routes/emergencyevents.routes');

const { getIo } = require('../sockets');

async function findNearestHospital(userLocation) {
    try {
    // Assume getAllHospitalAccountsDB() is a function that fetches all hospitals from the database
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
    let hospitalIn2Kota = [];
    for (const kota of nearestkota) {
        try {
            const hospitalInKota = await getAllHospitalAccountsByKotaDB(kota.kotaInProvinsi.id);
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
        // console.log(hospital.hospital_name)
        const distance = distanceBetweenTwoPoints(userLocation.coordinates, hospitalCoordinates);

        if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestHospital = hospital;
        }
    });

    return nearestHospital;
    } catch (error) {
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

        const created = await createEmergencyEventDB(user_id, user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions, is_done);
        
        if(created.title == null){
            created.title = "No provided title";
        }

        if(created.descriptions == null){
            created.descriptions = "No provided descriptions";
        }

        //LOGIKA PENENTUAN HOSPITAL ID DAN DRIVER ID.

        // console.log(user_location.coordinates); //[longitude, latitude]
        // cari 2 provinsi terdekat terus 2 kota terdekat baru 1 rumah sakit terdekat

        // search for nearest hospital
        const nearestHospital = await findNearestHospital(user_location);
        console.log(nearestHospital.id);

        io.to(`hospital${nearestHospital.id}`).emit("emergency", {
            "emergency_event_id": created.id,
            "user_id": user_id,
            "user_location": user_location,
            "emergency_type": emergency_type,
            "number_of_patient": number_of_patient,
            "title": title,
            "descriptions": descriptions
        })

        const success = new SuccessResponse("Emergency event acknowledge", {
            "emergency_event_id": created.id,
            "user_id": user_id,
            "user_location": user_location,
            "emergency_type": emergency_type,
            "number_of_patient": number_of_patient,
            "title": created.title,
            "descriptions": created.descriptions,
            "is_done": is_done,
            "message": "Emergency event acknowledge by server. Please wait for hospital & driver to accept the emergency event. we will notify you when the event is accepted by hospital & driver from websocket.",
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

module.exports = {
    createEmergencyEvent
}