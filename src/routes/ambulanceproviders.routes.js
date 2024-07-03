const router = require('express').Router();
const {createAmbulanceProvider, validateAmbulanceProvider, getAllAmbulanceProviders} = require('../controllers/ambulanceproviders.controller');
const { verifyAdminToken } = require('../middleware/token.middleware');

router.post('/register',verifyAdminToken, createAmbulanceProvider);
router.post('/login', validateAmbulanceProvider);
router.get('/all',verifyAdminToken, getAllAmbulanceProviders);

module.exports = router;