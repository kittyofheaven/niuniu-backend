const model = require('../models');
const hospitals = model.Hospitals;
const { Op } = require('sequelize');

const createHospitalDB = async (hospital_name, phone_number, kelas, location, kota_id) => {
    return hospitals.create({
        hospital_name: hospital_name,
        phone_number: phone_number,
        kelas: kelas,
        location: location,
        kota_id: kota_id
    });
}

const findHospitalByIdDB = async (id) => {
    try{
        return await hospitals.findOne({
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findAllHospitalsByCityAndClassListDB = async (city_id, classList) => {
    try {
        return await hospitals.findAll({
            where: {
                kota_id: city_id,
                kelas: {
                    [Op.in]: classList
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createHospitalDB,
    findHospitalByIdDB,
    findAllHospitalsByCityAndClassListDB
}