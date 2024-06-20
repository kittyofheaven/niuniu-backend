const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const driverAccountsServices = require('../services/driveraccounts.service');

const createDriverAccount = async (req, res) => {
    const { email, phone_number, first_name, last_name, password, ambulance_provider_id} = req.body;
    try{
        await driverAccountsServices.createDriverAccount(email, phone_number, first_name, last_name, password, ambulance_provider_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateDriverAccount = async (req, res) => {
    try{
        const { email, password, fcm_token } = req.body;
        if (!email || !password || !fcm_token){
            throw new FieldEmptyError('Email or password or fcm_token is empty');
        }
        await driverAccountsServices.validateDriverAccount(email, password, fcm_token,  res);
    } catch (error){
        errorHandler(error, res);
    }
}

const logoutDriverAccount = async (req, res) => {
    try{
        const driver_id = req.driverAccount.id;
        await driverAccountsServices.logoutDriverAccount(driver_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createDriverAccount,
    validateDriverAccount,
    logoutDriverAccount
}