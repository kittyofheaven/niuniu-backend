const models = require('../models');
const ambulanceProviders = models.AmbulanceProviders;

const createAmbulanceProviderDB = async (email, phone_number, ambulance_provider_name, hashedPassword, location) => {
    return ambulanceProviders.create({
        email: email,
        phone_number: phone_number,
        ambulance_provider_name: ambulance_provider_name,
        password: hashedPassword,
        location: location
    });
}

const findAmbulanceProviderByIdDB = async (id) => {
    try{
        return await ambulanceProviders.findOne({
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findAmbulanceProviderByEmailDB = async (email) => {
    try{
        return await ambulanceProviders.findOne({
            where: {
                email
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findAmbulanceProviderByNameDB = async (ambulance_provider_name) => {
    try{
        return await ambulanceProviders.findOne({
            where: {
                ambulance_provider_name
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const resetPasswordAmbulanceProviderDB = async (email, newHashedPassword) => {
    try{
        return await ambulanceProviders.update({
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

const getAllAmbulanceProvidersDB = async () => {
    try{
        return await ambulanceProviders.findAll();
    }
    catch (error){
        console.log(error);
    }
}

const getAllAmbulanceProvidersByKotaDB = async (kota_id) => {
    try{
        return await ambulanceProviders.findAll({
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
    createAmbulanceProviderDB,
    findAmbulanceProviderByIdDB,
    findAmbulanceProviderByEmailDB,
    findAmbulanceProviderByNameDB,
    resetPasswordAmbulanceProviderDB,
    getAllAmbulanceProvidersDB,
    getAllAmbulanceProvidersByKotaDB
}

