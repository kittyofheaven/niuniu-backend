const models = require('../models');
const userAccounts = models.UserAccounts;

const createUserAccountDB = async (email, phone_number, first_name, last_name, hashedPassword) => {
    return userAccounts.create({
        email: email,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword
    });
}

const findUserAccountByEmailDB = async (email) => {
    try{
        return await userAccounts.findOne({
            where: {
                email
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const resetPasswordUserAccountDB = async (email, newHashedPassword) => {
    try{
        return await userAccounts.update({
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

const verifyUserAccountDB = async (email) => {
    try{
        return await userAccounts.update({
            is_verified: true
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
    createUserAccountDB,
    findUserAccountByEmailDB,
    resetPasswordUserAccountDB
}