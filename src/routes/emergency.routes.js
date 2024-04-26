const router = require('express').Router();
const {postEmergencyController} = require('../controllers/emergency.controller');

router.post('/', postEmergencyController);

module.exports = router;