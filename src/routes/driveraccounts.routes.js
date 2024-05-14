const router = require('express').Router();
const {createDriverAccount, validateDriverAccount} = require('../controllers/driveraccounts.controller');

router.post('/register', createDriverAccount);
router.post('/login', validateDriverAccount);

module.exports = router;