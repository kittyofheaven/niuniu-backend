const {
  FieldEmptyError,
  errorHandler,
} = require("../middleware/error.middleware");
const ambulanceProvidersServices = require("../services/ambulanceproviders.service");

const createAmbulanceProvider = async (req, res) => {
  const {
    email,
    phone_number,
    ambulance_provider_name,
    password,
    location,
    kota_id,
  } = req.body;
  try {
    await ambulanceProvidersServices.createAmbulanceProvider(
      email,
      phone_number,
      ambulance_provider_name,
      password,
      location,
      kota_id,
      res
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateAmbulanceProvider = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new FieldEmptyError("Email or password is empty");
    }
    await ambulanceProvidersServices.validateAmbulanceProvider(
      email,
      password,
      res
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAmbulanceProviders = async (req, res) => {
  try {
    const filterParams = req.query;
    await ambulanceProvidersServices.getAllAmbulanceProviders(
      res,
      filterParams
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAmbulanceProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    await ambulanceProvidersServices.getAmbulanceProviderById(id, res);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAmbulanceProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await ambulanceProvidersServices.updateAmbulanceProvider(
      id,
      updateData,
      res
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAmbulanceProvider = async (req, res) => {
  try {
    const { id } = req.params;
    await ambulanceProvidersServices.deleteAmbulanceProvider(id, res);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createAmbulanceProvider,
  validateAmbulanceProvider,
  getAllAmbulanceProviders,
  getAmbulanceProviderById,
  updateAmbulanceProvider,
  deleteAmbulanceProvider,
};
