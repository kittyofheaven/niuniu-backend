const axios = require('axios');
const { CustomError } = require("../middleware/error.middleware");
const webSmsToken = process.env.SECRET_WEBSMS_TOKEN;
const goSmsUsername = process.env.SECRET_GOSMS_USERNAME;
const goSmsPassword = process.env.SECRET_GOSMS_PASSWORD;
const bcrypt = require("bcrypt");

const {
  createUserOtpDB,
  verifyUserOtpDB,
} = require("../repositories/userotp.repository");

const generateOTP = () => {
  const length = 6;
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};

const sendOTP = async (phone_number) => {
  const otpCode = generateOTP();
  await createUserOtpDB(phone_number, otpCode);

  const message = `(NIU NIU) : ${otpCode} valid for next 5 minutes. Do not share this with anyone.`;

  const encodedMessage = encodeURIComponent(message);
  // https://websms.co.id/api/smsgateway-otp?token=[token]&to=[to]&msg=[msg]

  // const url = `https://websms.co.id/api/smsgateway-otp?token=${webSmsToken}&to=${phone_number}&msg=${encodedMessage}`;
  const url = `http://secure.gosmsgateway.com/otp-trial/api/Send.php?username=${goSmsUsername}&mobile=${phone_number}&message=${message}&password=${goSmsPassword}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to send verification code");
    }

    return response.data; // Jika perlu, kembalikan data respons
  } catch (error) {
    // console.error(error);
    throw new Error("Failed to send verification code");
  }
};

const verifyOTP = async (phone_number, code) => {
  try {
    const verified = await verifyUserOtpDB(phone_number, code);
    if (!verified.success) {
      throw new CustomError(verified.message, 401);
    }
    return true;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

module.exports = {
    sendOTP,
    verifyOTP
}