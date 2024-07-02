const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const accountServices = require('../services/useraccounts.service');

const createUserAccount = async (req, res) => {
    const { email, phone_number, first_name, last_name, password } = req.body;
    try{
        await accountServices.createUserAccount(email, phone_number, first_name, last_name, password, res);
    } catch (error){
        errorHandler(error, res);
    }
};

const verifyUserAccountOTP = async (req, res) => {
    try{
        const { phone_number, code } = req.body;
        if (!phone_number || !code){
            throw new FieldEmptyError('Phone number or code is empty');
        }
        await accountServices.verifyUserAccountOTP(phone_number, code, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const resendUserAccountOTP = async (req, res) => {
    try{
        const { phone_number } = req.body;
        if (!phone_number){
            throw new FieldEmptyError('Phone number is empty');
        }
        await accountServices.resendUserAccountOTP(phone_number, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateUserAccount = async (req, res) => {
    try {
        const { identifier, password, fcm_token } = req.body;
        if (!identifier || !password || !fcm_token){
            throw new FieldEmptyError('Identifier or password or fcm_token is empty');
        }
        await accountServices.validateUserAccount(identifier, password, fcm_token, res);
    } catch (error) {
        errorHandler(error, res);
    }
};

const logoutUserAccount = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        await accountServices.logoutUserAccount(user_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getUserAccountById = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        await accountServices.getUserAccountById(user_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const changeUserPassword = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        const { old_password, new_password } = req.body;
        if (!old_password || !new_password){
            throw new FieldEmptyError('Old password or new password is empty');
        }
        await accountServices.changeUserPassword(user_id, old_password, new_password, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const updateUserInformation = async (req, res) => {
    try{
        const user_id = req.userAccount.id;
        const { email, phone_number, first_name, last_name } = req.body;
        await accountServices.updateUserInformation(user_id, email, phone_number, first_name, last_name, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createUserAccount,
    verifyUserAccountOTP,
    resendUserAccountOTP,
    validateUserAccount,
    logoutUserAccount,
    getUserAccountById,
    changeUserPassword,
    updateUserInformation
}