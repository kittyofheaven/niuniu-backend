//  emergency.routes.js
//  Created by Hazel Handrata on 25/04/24.

const router = require('express').Router();
const {postEmergencyController} = require('../controllers/emergency.controller');

router.post('/', postEmergencyController);

module.exports = router;