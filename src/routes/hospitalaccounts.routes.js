const router = require('express').Router();
const {createHospitalAccount, validateHospitalAccount} = require('../controllers/hospitalaccounts.controllers');

router.post('/register', createHospitalAccount);
router.post('/login', validateHospitalAccount);

module.exports = router;