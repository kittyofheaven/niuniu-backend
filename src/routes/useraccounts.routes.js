const router = require('express').Router();
const {createUserAccount, validateUserAccount, verifyUserAccountOTP, resendUserAccountOTP, logoutUserAccount} = require('../controllers/useraccounts.controller');
const { verifyUserToken } = require('../middleware/token.middleware');

router.post('/register', createUserAccount);
router.post('/verify', verifyUserAccountOTP);
router.post('/resend', resendUserAccountOTP);
router.post('/login', validateUserAccount);
router.put('/logout', verifyUserToken, logoutUserAccount);

module.exports = router;