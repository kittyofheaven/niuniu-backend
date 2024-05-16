const router = require('express').Router();
const {createEmergencyEvent} = require('../controllers/emergencyevents.controller');
const { verifyUserToken } = require('../middleware/token.middleware');

router.post('/create',verifyUserToken, createEmergencyEvent);

module.exports = router;