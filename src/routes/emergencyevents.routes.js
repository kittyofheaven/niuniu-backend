const router = require('express').Router();
const {
    createEmergencyEvent,
    getAllUserEmergencyEvents,
    getAllUserEmergencyEventsIsDone,
    getAllUserEmergencyEventsIsNotDone,
    getAllDriverEmergencyEvents,
    getAllDriverEmergencyEventsIsDone,
    getAllDriverEmergencyEventsIsNotDone,
    updateDoneEmergencyEvent
} = require('../controllers/emergencyevents.controller');
const { verifyUserToken, verifyDriverToken } = require('../middleware/token.middleware');

router.post('/create',verifyUserToken, createEmergencyEvent);
router.get('/user',verifyUserToken, getAllUserEmergencyEvents);
router.get('/user/done',verifyUserToken, getAllUserEmergencyEventsIsDone);
router.get('/user/notdone',verifyUserToken, getAllUserEmergencyEventsIsNotDone);
router.get('/driver',verifyDriverToken, getAllDriverEmergencyEvents);
router.get('/driver/done',verifyDriverToken, getAllDriverEmergencyEventsIsDone);
router.get('/driver/notdone',verifyDriverToken, getAllDriverEmergencyEventsIsNotDone);
router.post('/update',verifyDriverToken, updateDoneEmergencyEvent);

module.exports = router;