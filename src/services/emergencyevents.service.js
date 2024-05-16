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

const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");

const createEmergencyEvent = async (user_id, user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions, res) => {
    try{
        if (!user_id || !user_location || !driver_id || !hospital_id || !emergency_type){
            throw new FieldEmptyError("All fields are required");
        }

        let is_done = false;

        const created = await createEmergencyEventDB(user_id, user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions, is_done);
        
        if(created.title == null){
            created.title = "No provided title";
        }

        if(created.descriptions == null){
            created.descriptions = "No provided descriptions";
        }

        //LOGIKA PENENTUAN HOSPITAL ID DAN DRIVER ID.
        

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