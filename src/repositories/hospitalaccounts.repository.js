const models = require('../models');
const hospitalAccounts = models.HospitalAccounts;

const createHospitalAccountDB = async (email, phone_number, hospital_name, hashedPassword, location) => {
    return hospitalAccounts.create({
        email: email,
        phone_number: phone_number,
        hospital_name: hospital_name,
        password: hashedPassword,
        location: location
    });
}

const findHospitalAccountByIdDB = async (id) => {
    try{
        return await hospitalAccounts.findOne({
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findHospitalAccountByEmailDB = async (email) => {
    try{
        return await hospitalAccounts.findOne({
            where: {
                email
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findHospitalAccountByNameDB = async (hospital_name) => {
    try{
        return await hospitalAccounts.findOne({
            where: {
                hospital_name
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const resetPasswordHospitalAccountDB = async (email, newHashedPassword) => {
    try{
        return await hospitalAccounts.update({
            password : newHashedPassword
        }, {
            where: {
                email
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const getAllHospitalAccountsDB = async () => {
    try{
        return await hospitalAccounts.findAll();
    }
    catch (error){
        console.log(error);
    }
}

const getAllHospitalAccountsByKotaDB = async (kota_id) => {
    try{
        return await hospitalAccounts.findAll({
            where: {
                kota_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    createHospitalAccountDB,
    findHospitalAccountByIdDB,
    findHospitalAccountByEmailDB,
    findHospitalAccountByNameDB,
    resetPasswordHospitalAccountDB,
    getAllHospitalAccountsDB,
    getAllHospitalAccountsByKotaDB
}

