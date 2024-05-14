const { createHospitalAccountDB, findHospitalAccountByEmailDB, findHospitalAccountByNameDB, resetPasswordHospitalAccountDB } = require('../repositories/hospitalaccounts.repository'); 
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createHospitalAccount = async (email, phone_number, hospital_name, password, location, res) => {
    try{
        if (!email || !phone_number || !hospital_name || !password || !location){
            throw new FieldEmptyError("All fields are required");
        }

        if (phone_number.length < 10 || phone_number.length > 13){
            throw new CustomError("Phone number must be between 10 to 13 characters", 400);
        }

        if (password.length < 8){
            throw new CustomError("Password must be at least 8 characters", 400);
        }
        
        if (await findHospitalAccountByEmailDB(email)){
            throw new CustomError("Email already registered", 409);
        }

        if (await findHospitalAccountByNameDB(hospital_name)){
            throw new CustomError("Hospital name already registered", 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // email, phone_number, hospital_name, hashedPassword, location
        const created = await createHospitalAccountDB(email, phone_number, hospital_name, hashedPassword, location);
        
        const success = new SuccessResponse("Hospital account created successfully", {
            "hospital_id": created.id,
            "email": created.email,
            "phone_number": created.phone_number,
            "hospital_name": created.hospital_name,
            "location": created.location
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateHospitalAccount = async (email, password, res) => {
    try{
        if (!email || !password){
            throw new FieldEmptyError("All fields are required");
        }

        const hospital = await findHospitalAccountByEmailDB(email);
        if (!hospital){
            throw new CustomError("Email not registered", 404);
        }

        const validPassword = await bcrypt.compare(password, hospital.password);
        if (!validPassword){
            throw new CustomError("Invalid password", 401);
        }

        const token = jwt.sign({id: hospital.id}, process.env.SECRET_JWT_TOKEN_HOSPITAL, {expiresIn: '365d'});
        const success = new SuccessResponse("Login successful", {
            "hospital_id": hospital.id,
            "email": hospital.email,
            "phone_number": hospital.phone_number,
            "hospital_name": hospital.hospital_name,
            "location": hospital.location,
            "token": token
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

module.exports = {
    createHospitalAccount,
    validateHospitalAccount
}