const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const emergencyEventsServices = require('../services/emergencyevents.service');

// {
//     createEmergencyEvent,
//     getAllUserEmergencyEvents,
//     getAllUserEmergencyEventsIsDone,
//     getAllUserEmergencyEventsIsNotDone,
//     getAllDriverEmergencyEvents,
//     getAllDriverEmergencyEventsIsDone,
//     getAllDriverEmergencyEventsIsNotDone,
//     updateDoneEmergencyEvent
// }

const createEmergencyEvent = async (req, res) => {
    const { user_location, emergency_type, number_of_patient, title, descriptions } = req.body;
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.createEmergencyEvent(user_id, user_location, emergency_type, number_of_patient, title, descriptions, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllUserEmergencyEvents = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.getAllUserEmergencyEvents(user_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllUserEmergencyEventsIsDone = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.getAllUserEmergencyEventsIsDone(user_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllUserEmergencyEventsIsNotDone = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.getAllUserEmergencyEventsIsNotDone(user_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllDriverEmergencyEvents = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        await emergencyEventsServices.getAllDriverEmergencyEvents(driver_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllDriverEmergencyEventsIsDone = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        await emergencyEventsServices.getAllDriverEmergencyEventsIsDone(driver_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllDriverEmergencyEventsIsNotDone = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        await emergencyEventsServices.getAllDriverEmergencyEventsIsNotDone(driver_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const updateDoneEmergencyEvent = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        const { emergency_event_id } = req.body;
        await emergencyEventsServices.updateDoneEmergencyEvent(driver_id, emergency_event_id, res);
    } catch (error){
        errorHandler(error, res);
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