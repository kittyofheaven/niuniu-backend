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
    try{
        const { email, password } = req.body;
        if (!email || !password){
            throw new FieldEmptyError('Email or password is empty');
        }
        await accountServices.validateUserAccount(email, password, res);
    } catch (error){
        errorHandler(error, res);
    }
};

module.exports = {
    createUserAccount,
    verifyUserAccountOTP,
    resendUserAccountOTP,
    validateUserAccount
}