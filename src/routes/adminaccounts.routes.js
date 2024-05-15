const router = require('express').Router();
const {validateAdminAccount} = require('../controllers/adminaccounts.controller');

router.post('/login', validateAdminAccount);

module.exports = router;