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

const resetPasswordUserAccountByIdDB = async (id, newHashedPassword) => {
    try{
        return await userAccounts.update({
            password : newHashedPassword
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

const findUserAccountByPhoneNumberDB = async (phone_number) => {
    try{
        return await userAccounts.findOne({
            where: {
                phone_number
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findUserAccountByIdDB = async (id) => {
    try{
        return await userAccounts.findOne({
            where: {
                id
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

const deverifyUserAccountDB = async (id) => {
    try{
        return await userAccounts.update({
            is_verified: false
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

const insertFcmtokenDB = async (id, fcm_token) => {
    try{
        return await userAccounts.update({
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
        return await userAccounts.update({
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

const updateUserInformationDB = async (id, email, phone_number, first_name, last_name) => {
    try{
        return await userAccounts.update({
            email,
            phone_number,
            first_name,
            last_name
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

module.exports = {
    createUserAccountDB,
    findUserAccountByEmailDB,
    findUserAccountByPhoneNumberDB,
    findUserAccountByIdDB,
    resetPasswordUserAccountDB,
    resetPasswordUserAccountByIdDB,
    verifyUserAccountDB,
    deverifyUserAccountDB,
    insertFcmtokenDB,
    deleteFcmTokenDB,
    updateUserInformationDB
}