const models = require('../models');
const driverAccounts = models.DriverAccounts;


// email: DataTypes.STRING,
// phone_number: DataTypes.STRING,
// first_name: DataTypes.STRING,
// last_name: DataTypes.STRING,
// password: DataTypes.STRING,
// ambulance_provider_id: DataTypes.INTEGER
const createDriverAccountDB = async (email, phone_number, first_name, last_name, hashedPassword, ambulance_provider_id) => {
    return driverAccounts.create({
        email: email,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
        ambulance_provider_id: ambulance_provider_id
    });
}

const findDriverAccountByEmailDB = async (email) => {
    try{
        return await driverAccounts.findOne({
            where: {
                email
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findDriverAccountByHospitalDB = async (ambulance_provider_id) => {
    try{
        return await driverAccounts.findAll({
            where: {
                ambulance_provider_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const resetPasswordDriverAccountDB = async (email, newHashedPassword) => {
    try{
        return await driverAccounts.update({
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

const insertFcmtokenDB = async (id, fcm_token) => {
    try{
        return await driverAccounts.update({
            fcm_token
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const deleteFcmTokenDB = async (id) => {
    try{
        return await driverAccounts.update({
            fcm_token: null
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const FindAllDriverByAmbulanceProviderDB = async (ambulance_provider_id) => {
    try{
        return await driverAccounts.findAll({
            where: {
                ambulance_provider_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    createDriverAccountDB,
    findDriverAccountByEmailDB,
    findDriverAccountByHospitalDB,
    resetPasswordDriverAccountDB,
    insertFcmtokenDB,
    deleteFcmTokenDB,
    FindAllDriverByAmbulanceProviderDB
}