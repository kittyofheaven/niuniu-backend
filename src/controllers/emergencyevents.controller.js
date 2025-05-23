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
    const { user_location, number_of_patient, title, descriptions } = req.body;
    try{
        const user_id = req.userAccount.id;
        await emergencyEventsServices.createEmergencyEvent(user_id, user_location, number_of_patient, title, descriptions, res);
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

const updateEmergencyEventDriverId = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        const { emergency_event_id } = req.body;

        await emergencyEventsServices.updateEmergencyEventDriverId(emergency_event_id, driver_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const updateEmergencyTypeEmergencyEvent = async (req, res) => {
    try{
        const { emergency_event_id, emergency_type } = req.body;
        const driver_id = req.driverAccount.id;
        await emergencyEventsServices.updateEmergencyTypeEmergencyEvent(driver_id, emergency_event_id, emergency_type, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const updateRatingEmergencyEvent = async (req, res) => {
    try{
        const { emergency_event_id, rating } = req.body;
        const user_id = req.userAccount.id;
        await emergencyEventsServices.updateRatingEmergencyEvent(user_id, emergency_event_id, rating, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllEmergencyEvents = async (req, res) => {
    try {
        const filterParams = req.query;
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not provided
        
        // Add page and limit to filterParams
        // filterParams.page = page;
        // filterParams.limit = limit;

        await emergencyEventsServices.getAllEmergencyEvents(page, limit, filterParams, res);
    } catch (error) {
        errorHandler(error, res);
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
    updateEmergencyEventDriverId,
    updateDoneEmergencyEvent,
    updateEmergencyTypeEmergencyEvent,
    updateRatingEmergencyEvent,
    getAllEmergencyEvents
}