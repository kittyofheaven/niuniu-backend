const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');
const adminAccountsServices = require('../services/adminaccounts.service');

const validateAdminAccount = async (req, res) => {
    try{
        const { username, password } = req.body;
        if (!username || !password){
            throw new FieldEmptyError('Username or password is empty');
        }
        await adminAccountsServices.validateAdminAccount(username, password, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    validateAdminAccount
}