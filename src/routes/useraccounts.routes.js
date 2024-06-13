const router = require('express').Router();
const {createUserAccount, validateUserAccount, verifyUserAccountOTP, resendUserAccountOTP} = require('../controllers/useraccounts.controller');

router.post('/register', createUserAccount);
router.post('/verify', verifyUserAccountOTP);
router.post('/resend', resendUserAccountOTP);
router.post('/login', validateUserAccount);

module.exports = router;