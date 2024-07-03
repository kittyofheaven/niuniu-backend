const {findAllKotaByProvinsiIdDB} = require('../repositories/kota.repository');
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");

const getAllKotaByProvinsi = async (provinsi_id, res) => {
    try{
        const kota = await findAllKotaByProvinsiIdDB(provinsi_id);
        const success = new SuccessResponse("Kota fetched successfully", kota);
        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    getAllKotaByProvinsi
}