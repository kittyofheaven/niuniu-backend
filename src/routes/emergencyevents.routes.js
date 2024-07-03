const router = require('express').Router();
const {
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
    getAllEmergencyEvents
} = require('../controllers/emergencyevents.controller');
const { verifyUserToken, verifyDriverToken, verifyAdminToken } = require('../middleware/token.middleware');

router.post('/create',verifyUserToken, createEmergencyEvent);
router.get('/user',verifyUserToken, getAllUserEmergencyEvents);
router.get('/user/done',verifyUserToken, getAllUserEmergencyEventsIsDone);
router.get('/user/notdone',verifyUserToken, getAllUserEmergencyEventsIsNotDone);
router.get('/driver',verifyDriverToken, getAllDriverEmergencyEvents);
router.get('/driver/done',verifyDriverToken, getAllDriverEmergencyEventsIsDone);
router.get('/driver/notdone',verifyDriverToken, getAllDriverEmergencyEventsIsNotDone);
router.post('/update/done',verifyDriverToken, updateDoneEmergencyEvent);
router.post('/update/driver',verifyDriverToken, updateEmergencyEventDriverId);
router.post('/update/type',verifyDriverToken, updateEmergencyTypeEmergencyEvent);
router.post('/update/rating',verifyUserToken, updateRatingEmergencyEvent);
router.get('/all', verifyAdminToken, getAllEmergencyEvents);

module.exports = router;