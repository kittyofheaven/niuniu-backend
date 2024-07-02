const router = require('express').Router();
const {createUserAccount, validateUserAccount, verifyUserAccountOTP, resendUserAccountOTP, logoutUserAccount, getUserAccountById, changeUserPassword, updateUserInformation} = require('../controllers/useraccounts.controller');
const { verifyUserToken } = require('../middleware/token.middleware');

router.post('/register', createUserAccount);
router.post('/verify', verifyUserAccountOTP);
router.post('/resend', resendUserAccountOTP);
router.post('/login', validateUserAccount);
router.put('/logout', verifyUserToken, logoutUserAccount);
router.get('/profile', verifyUserToken, getUserAccountById);
router.put('/profile/update-password', verifyUserToken, changeUserPassword);
router.put('/profile/update', verifyUserToken, updateUserInformation);


module.exports = router;