const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const accountServices = require('../services/useraccounts.services');

const createUserAccount = async (req, res) => {
    const { email, phone_number, first_name, last_name, password } = req.body;
    try{
        await accountServices.createUserAccount(email, phone_number, first_name, last_name, password, res);
    } catch (error){
        errorHandler(error, res);
    }
};

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
    validateUserAccount
}