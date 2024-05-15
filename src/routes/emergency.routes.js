//  emergency.routes.js
//  Created by Hazel Handrata on 25/04/24.

const router = require('express').Router();
const {postEmergencyController} = require('../controllers/emergency.controller');
const { verifyUserToken } = require('../middleware/token.middleware');

router.post('/', verifyUserToken, postEmergencyController);

module.exports = router;