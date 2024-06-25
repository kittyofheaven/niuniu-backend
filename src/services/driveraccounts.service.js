    const { createDriverAccountDB, findDriverAccountByEmailDB, findDriverAccountByHospitalDB, resetPasswordDriverAccountDB, insertFcmtokenDB, deleteFcmTokenDB} = require('../repositories/driveraccounts.repository');
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createDriverAccount = async (email, phone_number, first_name, last_name, password, ambulance_provider_id, res) => {
    try{
        if (!email || !phone_number || !first_name || !last_name || !password || !ambulance_provider_id){
            throw new FieldEmptyError("All fields are required");
        }

        if (phone_number.length < 10 || phone_number.length > 13){
            throw new CustomError("Phone number must be between 10 to 13 characters", 400);
        }

        if (password.length < 8){
            throw new CustomError("Password must be at least 8 characters", 400);
        }
        
        if (await findDriverAccountByEmailDB(email)){
            throw new CustomError("Email already registered", 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // email, phone_number, first_name, last_name, hashedPassword, ambulance_provider_id
        const created = await createDriverAccountDB(email, phone_number, first_name, last_name, hashedPassword, ambulance_provider_id);

        console.log(created);
        
        const success = new SuccessResponse("Driver account created successfully", {
            "driver_id": created.id,
            "email": created.email,
            "phone_number": created.phone_number,
            "first_name": created.first_name,
            "last_name": created.last_name,
            "ambulance_provider_id": created.ambulance_provider_id
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateDriverAccount = async (email, password, fcm_token, res) => {
    try{
        if (!email || !password){
            throw new FieldEmptyError("All fields are required");
        }

        const driver = await findDriverAccountByEmailDB(email);
        if (!driver){
            throw new CustomError("Email not registered", 404);
        }

        const validPassword = await bcrypt.compare(password, driver.password);
        if (!validPassword){
            throw new CustomError("Invalid password", 401);
        }

        const created_fcm_token = await insertFcmtokenDB(driver.id, fcm_token);

        const token = jwt.sign({ id: driver.id }, process.env.SECRET_JWT_TOKEN_DRIVER, { expiresIn: '365d' });

        const success = new SuccessResponse("Login successful", {
            "driver_id": driver.id,
            "email": driver.email,
            "phone_number": driver.phone_number,
            "first_name": driver.first_name,
            "last_name": driver.last_name,
            "ambulance_provider_id": driver.ambulance_provider_id,
            "ambulance_provider_name": driver.ambulance_provider_driverAccounts.ambulance_provider_name,
            "fcm_token": created_fcm_token,
            "token": token
        });

        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const logoutDriverAccount = async (driver_id, res) => {
    try{
        const created_fcm_token = await deleteFcmTokenDB(driver_id);

        const success = new SuccessResponse("Logout successful", {
            "driver_id": driver_id,
            "fcm_token": created_fcm_token
        });

        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }

}

module.exports = {
    createDriverAccount,
    validateDriverAccount,
    logoutDriverAccount
}