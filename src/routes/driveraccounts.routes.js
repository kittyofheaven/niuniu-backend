const router = require('express').Router();
const {createDriverAccount, validateDriverAccount} = require('../controllers/driveraccounts.controller');
const { verifyHospitalToken } = require('../middleware/token.middleware');

router.post('/register', verifyHospitalToken, createDriverAccount);
router.post('/login', validateDriverAccount);

module.exports = router;