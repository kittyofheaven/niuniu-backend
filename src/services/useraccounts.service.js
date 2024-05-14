const { createUserAccountDB, findUserAccountByEmailDB, resetPasswordUserAccountDB } = require ('../repositories/useraccounts.repository')
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserAccount = async (email, phone_number, first_name, last_name, password, res) => {
    try{
        if (!email || !phone_number || !first_name || !last_name || !password){
            throw new FieldEmptyError("All fields are required");
        }

        if (phone_number.length < 10 || phone_number.length > 13){
            throw new CustomError("Phone number must be between 10 to 13 characters", 400);
        }

        if (password.length < 8){
            throw new CustomError("Password must be at least 8 characters", 400);
        }
        
        if (await findUserAccountByEmailDB(email)){
            throw new CustomError("Email already registered", 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // email, phone_number, first_name, last_name, hashedPassword
        const created = await createUserAccountDB(email, phone_number, first_name, last_name, hashedPassword);

        // SEND EMAIL VERIFICATION DISINI
        
        const success = new SuccessResponse("User account created successfully", {
            "user_id": created.id,
            "email": created.email,
            "phone_number": created.phone_number,
            "first_name": created.first_name,
            "last_name": created.last_name
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateUserAccount = async (email, password, res) => {
    try{
        if (!email || !password){
            throw new FieldEmptyError("All fields are required");
        }

        const user = await findUserAccountByEmailDB(email);
        if (!user){
            throw new CustomError("Email not registered", 404);
        }

        if (!user.is_verified){
            throw new CustomError("Email not verified, please check your email", 403);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            throw new CustomError("Invalid password", 401);
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_JWT_TOKEN_USER, {expiresIn: '365d'});
        const success = new SuccessResponse("User account validated successfully", {
            "user_id": user.id,
            "email": user.email,
            "phone_number": user.phone_number,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "token": token
        });

        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createUserAccount,
    validateUserAccount
}