const { createAmbulanceProviderDB, findAmbulanceProviderByEmailDB, findAmbulanceProviderByNameDB, resetPasswordAmbulanceProviderDB, getAllAmbulanceProvidersDB } = require('../repositories/ambulanceproviders.repository'); 
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { get } = require('../routes/useraccounts.routes');

const createAmbulanceProvider = async (email, phone_number, ambulance_provider_name, password, location, kota_id, res) => {
    try{
        if (!email || !phone_number || !ambulance_provider_name || !password || !location || !kota_id){
            throw new FieldEmptyError("All fields are required");
        }

        if (phone_number.length < 10 || phone_number.length > 13){
            throw new CustomError("Phone number must be between 10 to 13 characters", 400);
        }

        if (password.length < 8){
            throw new CustomError("Password must be at least 8 characters", 400);
        }
        
        if (await findAmbulanceProviderByEmailDB(email)){
            throw new CustomError("Email already registered", 409);
        }

        if (await findAmbulanceProviderByNameDB(ambulance_provider_name)){
            throw new CustomError("Hospital name already registered", 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // email, phone_number, ambulance_provider_name, hashedPassword, location
        const created = await createAmbulanceProviderDB(email, phone_number, ambulance_provider_name, hashedPassword, location, kota_id);
        
        const success = new SuccessResponse("Hospital account created successfully", {
            "ambulance_provider_id": created.id,
            "email": created.email,
            "phone_number": created.phone_number,
            "ambulance_provider_name": created.ambulance_provider_name,
            "location": created.location
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const validateAmbulanceProvider = async (email, password, res) => {
    try{
        if (!email || !password){
            throw new FieldEmptyError("All fields are required");
        }

        const ambulance_provider = await findAmbulanceProviderByEmailDB(email);
        if (!ambulance_provider){
            throw new CustomError("Email not registered", 404);
        }

        const validPassword = await bcrypt.compare(password, ambulance_provider.password);
        if (!validPassword){
            throw new CustomError("Invalid password", 401);
        }

        const token = jwt.sign({id: ambulance_provider.id}, process.env.SECRET_JWT_TOKEN_HOSPITAL, {expiresIn: '365d'});
        const success = new SuccessResponse("Login successful", {
            "ambulance_provider_id": ambulance_provider.id,
            "email": ambulance_provider.email,
            "phone_number": ambulance_provider.phone_number,
            "ambulance_provider_name": ambulance_provider.ambulance_provider_name,
            "location": ambulance_provider.location,
            "token": token
        });

        success.send201(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const getAllAmbulanceProviders = async (res, filterParams) => {
    try {
        const allHospitals = await getAllAmbulanceProvidersDB(filterParams);
        const success = new SuccessResponse("All ambulance providers", allHospitals);
        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}


module.exports = {
    createAmbulanceProvider,
    validateAmbulanceProvider,
    getAllAmbulanceProviders
}