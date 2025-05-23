const { createUserAccountDB, 
        findUserAccountByEmailDB, 
        findUserAccountByPhoneNumberDB, 
        resetPasswordUserAccountDB,
        resetPasswordUserAccountByIdDB, 
        verifyUserAccountDB,
        deverifyUserAccountDB, 
        insertFcmtokenDB, 
        deleteFcmTokenDB, 
        findUserAccountByIdDB, 
        updateUserInformationDB } = require ('../repositories/useraccounts.repository')
const SuccessResponse = require('../middleware/success.middleware')
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOTP, verifyOTP} = require('../helpers/sms.helper');
const { deleteAllUserOtpDB } = require('../repositories/userotp.repository');

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
        
        // email cant be double
        if (await findUserAccountByEmailDB(email)){
            throw new CustomError("Email already registered please go to login page", 409);
        }

        // phone_number cant be double
        if (await findUserAccountByPhoneNumberDB(phone_number)){
            throw new CustomError("Phone number already registered please go to login page", 409);
        }

        // SEND SMS VERIFICATION DISINI
        await sendOTP(phone_number)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // email, phone_number, first_name, last_name, hashedPassword
        const created = await createUserAccountDB(email, phone_number, first_name, last_name, hashedPassword);

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

const verifyUserAccountOTP = async (phone_number, code, res) => {
    try {
        user = await findUserAccountByPhoneNumberDB(phone_number);

        const verified = await verifyOTP(phone_number, code);

        console.log(verified);

        if (!verified){
            throw new CustomError("Invalid OTP", 401);
        }

        if(user.is_verified){
            throw new CustomError("Phone number already verified", 400);
        }

        await verifyUserAccountDB(user.email);

        // delete all from userOtp table to save space
        await deleteAllUserOtpDB(phone_number);

        const success = new SuccessResponse("User account verified successfully");
        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }
}

const resendUserAccountOTP = async (phone_number, res) => {
    try {
        user = await findUserAccountByPhoneNumberDB(phone_number);

        if (!user){
            throw new CustomError("Phone number not registered", 404);
        }

        if (user.is_verified){
            throw new CustomError("Phone number already verified", 400);
        }

        await sendOTP(phone_number);

        const success = new SuccessResponse("OTP resent successfully");
        success.send200(res);
    } catch (error){
        errorHandler(error, res);
    }

}

const validateUserAccount = async (identifier, password, fcm_token, res) => {
    try {
        if (!identifier || !password) {
            throw new FieldEmptyError("All fields are required");
        }

        let user;
        // Check if the identifier is an email or a phone number
        if (identifier.includes('@')) {
            user = await findUserAccountByEmailDB(identifier);
        } else {
            user = await findUserAccountByPhoneNumberDB(identifier);
        }

        if (!user) {
            throw new CustomError("Email or phone number not registered", 404);
        }

        if (!user.is_verified) {
            throw new CustomError("Phone number not verified, please check your sms", 403);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new CustomError("Invalid password", 401);
        }

        await insertFcmtokenDB(user.id, fcm_token);
        const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_TOKEN_USER, { expiresIn: '365d' });
        const success = new SuccessResponse("User account validated successfully", {
            "user_id": user.id,
            "email": user.email,
            "phone_number": user.phone_number,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "fcm_token": fcm_token,
            "token": token
        });

        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
};

const logoutUserAccount = async (user_id, res) => {
    try {
        const created_fcm_token = await deleteFcmTokenDB(user_id);

        const success = new SuccessResponse("Logout successful", {
            "user_id": user_id,
            "fcm_token": created_fcm_token
        });

        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getUserAccountById = async (user_id, res) => {
    try {
        const user = await findUserAccountByIdDB(user_id);

        if (!user) {
            throw new CustomError("User account not found", 404);
        }

        const success = new SuccessResponse("User account found", {
            "user_id": user.id,
            "email": user.email,
            "phone_number": user.phone_number,
            "first_name": user.first_name,
            "last_name": user.last_name
        });

        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}

const changeUserPassword = async (user_id, old_password, new_password, res) => {
    try {
        if (!old_password || !new_password) {
            throw new FieldEmptyError("All fields are required");
        }

        const user = await findUserAccountByIdDB(user_id);

        if (!user) {
            throw new CustomError("User account not found", 404);
        }

        const validPassword = await bcrypt.compare(old_password, user.password);
        if (!validPassword) {
            throw new CustomError("Invalid password", 401);
        }

        if (new_password.length < 8) {
            throw new CustomError("New password must be at least 8 characters", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        await resetPasswordUserAccountByIdDB(user_id, hashedPassword);

        const success = new SuccessResponse("Password changed successfully");
        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}

const updateUserInformation = async (user_id, email, phone_number, first_name, last_name, res) => {
    try {
        const user = await findUserAccountByIdDB(user_id);

        if (!user) {
            throw new CustomError("User account not found", 404);
        }

        let newEmail = email !== undefined ? email : user.email;
        let newPhoneNumber = phone_number !== undefined ? phone_number : user.phone_number;

        if (email !== undefined && email !== user.email) {
            if (await findUserAccountByEmailDB(email)) {
                throw new CustomError("Email already registered", 409);
            }
        }
        
        if (phone_number !== undefined) {
            if (phone_number.length < 10 || phone_number.length > 13) {
                throw new CustomError("Phone number must be between 10 to 13 characters", 400);
            }

            if (phone_number !== user.phone_number) {
                if (await findUserAccountByPhoneNumberDB(phone_number)) {
                    throw new CustomError("Phone number already registered", 409);
                }
                await deverifyUserAccountDB(user_id);
                await sendOTP(phone_number);
            }
        }

        const newFirstName = first_name !== undefined ? first_name : user.first_name;
        const newLastName = last_name !== undefined ? last_name : user.last_name;

        await updateUserInformationDB(user_id, newEmail, newPhoneNumber, newFirstName, newLastName);

        const success = new SuccessResponse("User information updated successfully");
        success.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}

module.exports = {
    createUserAccount,
    verifyUserAccountOTP,
    resendUserAccountOTP,
    validateUserAccount,
    logoutUserAccount,
    getUserAccountById,
    changeUserPassword,
    updateUserInformation
}