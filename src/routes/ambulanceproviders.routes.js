const router = require('express').Router();
const {createAmbulanceProvider, validateAmbulanceProvider} = require('../controllers/ambulanceproviders.controller');
const { verifyAdminToken } = require('../middleware/token.middleware');

router.post('/register',verifyAdminToken, createAmbulanceProvider);
router.post('/login', validateAmbulanceProvider);

module.exports = router;