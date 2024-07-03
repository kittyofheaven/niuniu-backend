const provinsiService = require('../services/provinsi.service');
const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');

const getAllProvinsi = async (req, res) => {
    try{
        await provinsiService.getAllProvinsi(res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    getAllProvinsi
}