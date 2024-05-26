const models = require('../models');
const kota = models.Kota;

const findAllKotaDB = async () => {
    try{
        return await kota.findAll();
    }
    catch (error){
        console.log(error);
    }
}

const findAllKotaByProvinsiIdDB = async (provinsi_id) => {
    try{
        return await kota.findAll({
            where: {
                provinsi_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
} 

module.exports = {
    findAllKotaDB,
    findAllKotaByProvinsiIdDB
}