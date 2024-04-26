const { errorHandler, FieldEmptyError } = require("../middleware/error.middleware");
const SuccessResponse = require('../middleware/success.middleware')

const postEmergencyController = async (req, res) => {
    try {
        const { name, phone, location, emergencyType } = req.body;

        if (!name || !phone || !location || !emergencyType) {
            throw new FieldEmptyError("All fields are required")
        }

        const data = {
            name,
            phone,
            location,
            emergencyType
        }
        const response = new SuccessResponse('Emergency request sent successfully', data);
        response.send200(res);
    } catch (error) {
        errorHandler(error, res);
    }
}

module.exports = {
    postEmergencyController
}