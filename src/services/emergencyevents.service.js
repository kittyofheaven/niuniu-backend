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
const {findHospitalAccountByIdDB, getAllHospitalAccountsDB} = require('../repositories/hospitalaccounts.repository');
const {distanceBetweenTwoPoints} = require('../helpers/distance.helper');

const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");

async function findNearestHospital(userLocation) {
    try {
    // Assume getAllHospitalAccountsDB() is a function that fetches all hospitals from the database
    const allHospitals = await getAllHospitalAccountsDB();

    if (allHospitals.length === 0) {
        throw new Error('No hospitals found in the database.');
    }

    let nearestHospital = null;
    let shortestDistance = Infinity;

    allHospitals.forEach(hospital => {
        const hospitalCoordinates = hospital.location.coordinates;
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

const createEmergencyEvent = async (user_id, user_location, driver_id, emergency_type, number_of_patient, title, descriptions, res) => {
    try{
        if (!user_id || !user_location || !driver_id || !emergency_type){
            throw new FieldEmptyError("All fields are required");
        }

        let is_done = false;

        //LOGIKA PENENTUAN HOSPITAL ID DAN DRIVER ID.

        // console.log(user_location.coordinates); //[longitude, latitude]
        // search for nearest hospital

        const nearestHospital = await findNearestHospital(user_location);
        nearestHospital.id;
        console.log(nearestHospital.id);
        
        const created = await createEmergencyEventDB(user_id, user_location, driver_id, nearestHospital.id, emergency_type, number_of_patient, title, descriptions, is_done);
        
        if(created.title == null){
            created.title = "No provided title";
        }

        if(created.descriptions == null){
            created.descriptions = "No provided descriptions";
        }

        const success = new SuccessResponse("Emergency event created successfully", {
            "emergency_event_id": created.id,
            "user_id": created.user_id,
            "user_location": created.user_location,
            "driver_id": created.driver_id,
            "hospital_id": created.hospital_id,
            "emergency_type": created.emergency_type,
            "number_of_patient": created.number_of_patient,
            "title": created.title,
            "descriptions": created.descriptions,
            "is_done": created.is_done
        });

        success.send201(res);
    } catch (error){
        throw error;
    }
}

module.exports = {
    createEmergencyEvent
}