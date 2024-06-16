const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const ambulanceProvidersServices = require('../services/ambulanceproviders.service');

const createAmbulanceProvider = async (req, res) => {
    const { email, phone_number, hospital_name, password, location } = req.body;
    try{
        await ambulanceProvidersServices.createAmbulanceProvider(email, phone_number, hospital_name, password, location, res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateAmbulanceProvider = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            throw new FieldEmptyError('Email or password is empty');
        }
        await ambulanceProvidersServices.validateAmbulanceProvider(email, password, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createAmbulanceProvider,
    validateAmbulanceProvider
}