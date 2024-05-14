const models = require('../models');
const driverAccounts = models.DriverAccounts;


// email: DataTypes.STRING,
// phone_number: DataTypes.STRING,
// first_name: DataTypes.STRING,
// last_name: DataTypes.STRING,
// password: DataTypes.STRING,
// hospital_id: DataTypes.INTEGER
const createDriverAccountDB = async (email, phone_number, first_name, last_name, hashedPassword, hospital_id) => {
    return driverAccounts.create({
        email: email,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
        hospital_id: hospital_id
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

const findDriverAccountByHospitalDB = async (hospital_id) => {
    try{
        return await driverAccounts.findAll({
            where: {
                hospital_id
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

module.exports = {
    createDriverAccountDB,
    findDriverAccountByEmailDB,
    findDriverAccountByHospitalDB,
    resetPasswordDriverAccountDB
}