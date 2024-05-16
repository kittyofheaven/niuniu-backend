const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const emergencyEventsServices = require('../services/emergencyevents.service');

const createEmergencyEvent = async (req, res) => {
    const { user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions } = req.body;
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.createEmergencyEvent(user_id, user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createEmergencyEvent
}