const {
  FieldEmptyError,
  errorHandler,
} = require("../middleware/error.middleware");
const driverAccountsServices = require("../services/driveraccounts.service");

const createDriverAccount = async (req, res) => {
  const {
    email,
    phone_number,
    first_name,
    last_name,
    password,
    ambulance_provider_id,
  } = req.body;
  try {
    await driverAccountsServices.createDriverAccount(
      email,
      phone_number,
      first_name,
      last_name,
      password,
      ambulance_provider_id,
      res
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateDriverAccount = async (req, res) => {
  try {
    const { email, password, fcm_token } = req.body;
    if (!email || !password || !fcm_token) {
      throw new FieldEmptyError("Email or password or fcm_token is empty");
    }
    await driverAccountsServices.validateDriverAccount(
      email,
      password,
      fcm_token,
      res
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutDriverAccount = async (req, res) => {
  try {
    const driver_id = req.driverAccount.id;
    await driverAccountsServices.logoutDriverAccount(driver_id, res);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllDriverAccounts = async (req, res) => {
  try {
    const filterParams = req.query;
    await driverAccountsServices.getAllDriverAccounts(filterParams, res);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDriverAccount = async (req, res) => {
  const driver_id = req.params.id;
  const updates = req.body;
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver ID is required");
    }
    const updatedDriver = await driverAccountsServices.updateDriverAccount(
      driver_id,
      updates,
      res
    );
    res.status(200).json(updatedDriver);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDriverAccountById = async (req, res) => {
  const driver_id = req.params.id;
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver ID is required");
    }
    const result = await driverAccountsServices.getDriverById(driver_id, res);
    res.status(200).json({ data: result });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deleteDriverAccount = async (req, res) => {
  const driver_id = req.params.id;
  try {
    if (!driver_id) {
      throw new FieldEmptyError("Driver ID is required");
    }
    const result = await driverAccountsServices.deleteDriverAccount(
      driver_id,
      res
    );
    res.status(200).send(result);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createDriverAccount,
  validateDriverAccount,
  logoutDriverAccount,
  getAllDriverAccounts,
  updateDriverAccount,
  deleteDriverAccount,
  getDriverAccountById,
};
