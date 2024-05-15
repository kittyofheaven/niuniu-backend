const router = require('express').Router();
const {createHospitalAccount, validateHospitalAccount} = require('../controllers/hospitalaccounts.controller');
const { verifyAdminToken } = require('../middleware/token.middleware');

router.post('/register',verifyAdminToken, createHospitalAccount);
router.post('/login', validateHospitalAccount);

module.exports = router;