const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const hospitalAccountsServices = require('../services/hospitalaccounts.services');

const createHospitalAccount = async (req, res) => {
    const { email, phone_number, hospital_name, password, location } = req.body;
    try{
        await hospitalAccountsServices.createHospitalAccount(email, phone_number, hospital_name, password, location, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateHospitalAccount = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            throw new FieldEmptyError('Email or password is empty');
        }
        await hospitalAccountsServices.validateHospitalAccount(email, password, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createHospitalAccount,
    validateHospitalAccount
}