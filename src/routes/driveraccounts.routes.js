const router = require('express').Router();
const {createDriverAccount, validateDriverAccount} = require('../controllers/driveraccounts.controller');
const { verifyHospitalToken, verifyAdminToken } = require('../middleware/token.middleware');

router.post('/register', verifyAdminToken, createDriverAccount);
router.post('/login', validateDriverAccount);

module.exports = router;