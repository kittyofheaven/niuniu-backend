const models = require('../models');
const provinsi = models.Provinsi;

const findAllProvinsiDB = async () => {
    try{
        return await provinsi.findAll();
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    findAllProvinsiDB
}