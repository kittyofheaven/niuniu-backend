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
        const { email, password } = req.body;
        if (!email || !password){
            throw new FieldEmptyError('Email or password is empty');
        }
        await driverAccountsServices.validateDriverAccount(email, password, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createDriverAccount,
    validateDriverAccount
}