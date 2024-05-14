const router = require('express').Router();
const {createUserAccount, validateUserAccount} = require('../controllers/useraccounts.controllers');

router.post('/register', createUserAccount);
router.post('/login', validateUserAccount);

module.exports = router;