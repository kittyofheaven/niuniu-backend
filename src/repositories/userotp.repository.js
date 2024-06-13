const models = require('../models');
const userOtp = models.UserOTP;
const bcrypt = require('bcrypt');

const createUserOtpDB = async (phone_number, otp_code) => {

    //bcrypt otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp_code, salt);

    return userOtp.create({
        phoneNumber: phone_number,
        otp: hashedOtp
    });
}

const verifyUserOtpDB = async (phone_number, otp_code) => {
    try {
        // Ambil data OTP terbaru berdasarkan phone_number
        const latestOtp = await userOtp.findOne({
            where: {
                phoneNumber: phone_number
            },
            order: [['createdAt', 'DESC']] // Urutkan berdasarkan createdAt secara descending (terbaru ke yang lama)
        });

        if (!latestOtp) {
            return { success: false, message: 'OTP not found' };
        }

        // Periksa apakah waktu kedaluwarsa (lebih dari 5 menit dari createdAt)
        const otpCreatedAt = latestOtp.createdAt;
        const currentTime = new Date();
        const timeDifference = (currentTime - otpCreatedAt) / (1000 * 60); // Difference in minutes

        if (timeDifference > 5) {
            return { success: false, message: 'OTP expired' };
        }

        // Bandingkan otp_code yang diterima dengan yang ada di database
        const isMatch = await bcrypt.compare(otp_code, latestOtp.otp);

        if (isMatch) {
            return { success: true, message: 'OTP verified successfully' };
        } else {
            return { success: false, message: 'Incorrect OTP' };
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('Failed to verify OTP repository');
    }
}

const deleteAllUserOtpDB = async (phone_number) => {
    try {
        return await userOtp.destroy({
            where: {
                phoneNumber: phone_number
            }
        });
    } catch (error) {
        console.error('Error deleting OTP:', error);
        throw new Error('Failed to delete OTP');
    }
}

module.exports = {
    createUserOtpDB,
    verifyUserOtpDB,
    deleteAllUserOtpDB
}
