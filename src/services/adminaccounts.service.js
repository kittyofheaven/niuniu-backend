const { createAdminAccountDB, findAdminAccountByUsernameDB } = require('../repositories/adminaccounts.repository');
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateAdminAccount = async (username, password, res) => {
    try{
        if (!username || !password){
            throw new FieldEmptyError("All fields are required");
        }

        const admin = await findAdminAccountByUsernameDB(username);
        if (!admin){
            throw new CustomError("Admin not registered", 404);
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword){
            throw new CustomError("Invalid password", 401);
        }

        const token = jwt.sign({ id: admin.id }, process.env.SECRET_JWT_TOKEN_ADMIN, { expiresIn: '1h' });

        const success = new SuccessResponse("Admin account validated successfully", {
            "admin_id": admin.id,
            "username": admin.username,
            "token": token
        });

        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    validateAdminAccount
}