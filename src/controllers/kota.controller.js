const kotaService = require('../services/kota.service');
const { UnknownError, CustomError, FieldEmptyError, UserNotFoundError, errorHandler, UnauthorizedError } = require('../middleware/error.middleware');

const getAllKotaByProvinsi = async (req, res) => {
    try{
        const provinsi_id = req.query.provinsi_id;
        if (!provinsi_id){
            throw new FieldEmptyError('Provinsi id is empty');
        }
        await kotaService.getAllKotaByProvinsi(provinsi_id, res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    getAllKotaByProvinsi
}

