const router = require('express').Router();
const {createDriverAccount, validateDriverAccount, logoutDriverAccount, getAllDriverAccounts} = require('../controllers/driveraccounts.controller');
const { verifyHospitalToken, verifyAdminToken, verifyDriverToken } = require('../middleware/token.middleware');

router.post('/register', verifyAdminToken, createDriverAccount);
router.post('/login', validateDriverAccount);
router.put('/logout', verifyDriverToken, logoutDriverAccount);
router.get('/all', verifyAdminToken, getAllDriverAccounts);

module.exports = router;