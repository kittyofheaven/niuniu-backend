const models = require('../models');
const adminAccounts = models.AdminAccounts;

const createAdminAccountDB = async (username, hashedPassword) => {
    return adminAccounts.create({
        username: username,
        password: hashedPassword
    });
}

const findAdminAccountByUsernameDB = async (username) => {
    try{
        return await adminAccounts.findOne({
            where: {
                username: username
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    findAdminAccountByUsernameDB,
    createAdminAccountDB
}