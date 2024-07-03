const {findAllProvinsiDB} = require('../repositories/provinsi.repository');
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");

const getAllProvinsi = async (res) => {
    try{
        const provinsi = await findAllProvinsiDB();
        const success = new SuccessResponse("Provinsi fetched successfully", provinsi);
        success.send200(res);
    } catch (error){
        throw error;
    }
}

module.exports = {
    getAllProvinsi
}