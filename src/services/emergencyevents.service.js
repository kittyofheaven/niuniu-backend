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
    updateEmergencyTypeEmergencyEventDB
} = require('../repositories/emergencyevents.repository');
const { 
    findAmbulanceProviderByIdDB, 
    getAllAmbulanceProvidersDB 
} = require('../repositories/ambulanceproviders.repository');
const { 
    findUserAccountByIdDB 
} = require('../repositories/useraccounts.repository');
const { 
    FindAllDriverByAmbulanceProviderDB 
} = require('../repositories/driveraccounts.repository');
const { 
    createHospitalDB, 
    findHospitalByIdDB 
} = require('../repositories/hospitals.repository');
const { 
    getHospitalClassification 
} = require('../helpers/hospitalclassifications.helper');
const { 
    findDriver, 
    findNearestHospital 
} = require('../helpers/finder.helper');
const SuccessResponse = require('../middleware/success.middleware');
const { 
    errorHandler, 
    FieldEmptyError, 
    CustomError 
} = require("../middleware/error.middleware");
const { getIo } = require('../sockets');
const { sendNotification } = require('../helpers/sendnotification.helper');

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
        const useraccount = await findUserAccountByIdDB(user_id);
        // console.log(useraccount);
        let name = useraccount.first_name + " " + useraccount.last_name;
        // console.log(name);

        if(created.title == null){
            created.title = "No provided title";
        }

        if(created.descriptions == null){
            created.descriptions = "No provided descriptions";
        }

        //LOGIKA PENENTUAN AMBULANCE PROVIDER ID DAN DRIVER ID.

        findDriver(user_location, created.id);

        const success = new SuccessResponse("Emergency event acknowledge", {
            "emergency_event_id": created.id,
            "user_id": user_id,
            "user_location": user_location,
            "emergency_type": emergency_type,
            "number_of_patient": number_of_patient,
            "title": created.title,
            "descriptions": created.descriptions,
            "is_done": is_done,
            "message": "Emergency event acknowledge by server. Please wait for ambulance provider & driver to accept the emergency event. we will notify you when the event is accepted by hospital & driver from websocket.",
            "socket_event": "emergency"
        });

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

const updateEmergencyEventDriverId = async (id, driver_id, res) => {
    try{
        if (!id || !driver_id){
            throw new FieldEmptyError("All fields are required");
        }

        if (isNaN(id) || isNaN(driver_id)){
            throw new CustomError("All fields must be a number", 400);
        }

        const emergencyEvent = await findEmergencyEventByIdDB(id);
        console.log(emergencyEvent);

        if(emergencyEvent == null){
            throw new CustomError("Emergency event not found", 404);
        }

        if(emergencyEvent.driver_id != null){
            throw new CustomError("Emergency event already has driver", 400);
        }

        const updated = await updateEmergencyEventDriverIdDB(id, driver_id);

        const success = new SuccessResponse("Emergency event updated successfully", updated);
        success.send200(res);
    }
    catch (error){
        throw error;
    }
}

const updateEmergencyTypeEmergencyEvent = async (driver_id, emergency_id, emergency_type, res) => {
    try{
        if (!emergency_id || !emergency_type){
            throw new FieldEmptyError("All fields are required");
        }

        if (isNaN(emergency_id)){
            throw new CustomError("All fields must be a number", 400);
        }

        const emergencyEvent = await findEmergencyEventByIdDB(emergency_id);

        if(emergencyEvent == null){
            throw new CustomError("Emergency event not found", 404);
        }

        if(emergencyEvent.driver_id != driver_id){
            throw new CustomError("Driver is not authorized to update this emergency event", 401);
        }

        if(emergencyEvent.is_done == true){
            throw new CustomError("Emergency event is already done", 400);
        }
        
        const user_id = emergencyEvent.user_id;
        const user_location = emergencyEvent.user_location;
        const useraccount = await findUserAccountByIdDB(user_id);
        let user_name = useraccount.first_name + " " + useraccount.last_name;

        const updated = await updateEmergencyTypeEmergencyEventDB(emergency_id, emergency_type);

        const nearestHospital = await findNearestHospital(user_location, getHospitalClassification(emergency_type));

        if(useraccount.fcm_token != null){
            const message = {
                notification: {
                    title: 'Hospital Found',
                    body: 'Hospital has been found, please proceed to the hospital for further action'
                },
                data: {
                    title: 'Hospital Found',
                    body: JSON.stringify({
                        emergency_event_id: emergency_id,
                        user_id: user_id,
                        user_name: user_name,
                        user_location: user_location,
                        hospital_location: nearestHospital.location,
                        emergency_type: emergency_type,
                        number_of_patient: emergencyEvent.number_of_patient,
                        title: emergencyEvent.title,
                        descriptions: emergencyEvent.descriptions
                    })
                },
                token: useraccount.fcm_token
            };
    
            const result = await sendNotification(message);
            if (result.success) {
                console.log('Successfully sent message:', result.response);
            } else {
                console.error('Error sending message:', result.error);
            }
        }

        const response = {
            "emergency_event_id": emergency_id,
            "user_id": user_id,
            "user_name": user_name,
            "user_location": user_location,
            "hospital_location": nearestHospital.location,
            "emergency_type": emergency_type,
            "number_of_patient": emergencyEvent.number_of_patient,
            "title": emergencyEvent.title,
            "descriptions": emergencyEvent.descriptions,
            "is_done": emergencyEvent.is_done,
            "message": "Emergency event updated successfully. Hospital has been found, please proceed to the hospital for further action",
            "updated": updated
        }

        const success = new SuccessResponse("Emergency event updated successfully", response);
        success.send200(res);
    }
    catch (error){
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
    updateDoneEmergencyEvent,
    updateEmergencyEventDriverId,
    updateEmergencyTypeEmergencyEvent
}