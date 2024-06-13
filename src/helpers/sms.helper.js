const axios = require('axios');
const { errorHandler, FieldEmptyError, CustomError } = require("../middleware/error.middleware");
const webSmsToken = process.env.SECRET_WEBSMS_TOKEN;
const bcrypt = require('bcrypt');

const { createUserOtpDB, verifyUserOtpDB } = require('../repositories/userotp.repository');

const generateOTP = () => {
    const length = 6;
    let otp = '';

    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); 
    }

    return otp;
}

const sendOTP = async (phone_number) => {
    const otpCode = generateOTP(); 
    await createUserOtpDB(phone_number, otpCode);

    const message = `(NIU NIU) : ${otpCode} valid for next 5 minutes. Do not share this with anyone.`;

    const encodedMessage = encodeURIComponent(message);
    // https://websms.co.id/api/smsgateway-otp?token=[token]&to=[to]&msg=[msg]

    console.log(phone_number)

    const url = `https://websms.co.id/api/smsgateway-otp?token=${webSmsToken}&to=${phone_number}&msg=${encodedMessage}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
    
        // console.log(response.data); // Jika perlu, tampilkan respons dari server

        if (response.data.status !== 'success') {
            throw new Error('Failed to send verification code');
        }

        return response.data; // Jika perlu, kembalikan data respons
    } catch (error) {
        // console.error(error);
        throw new Error('Failed to send verification code');
    }
}

const verifyOTP = async (phone_number, code) => {
    try {
        const verified = await verifyUserOtpDB(phone_number, code);
        if (!verified.success) {
            throw new CustomError(verified.message, 401);
        }
        return true;
    } catch (error) {
        // console.log("Failed to verify OTP");
        // console.log(error);
        // console.log(error.message);
        // console.log(error.statusCode);
        
        throw new CustomError(error.message, error.statusCode);
    }
}

module.exports = {
    sendOTP,
    verifyOTP
}