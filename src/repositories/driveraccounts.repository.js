const models = require('../models');
const { get } = require('../routes/provinsi.routes');
const driverAccounts = models.DriverAccounts;


// email: DataTypes.STRING,
// phone_number: DataTypes.STRING,
// first_name: DataTypes.STRING,
// last_name: DataTypes.STRING,
// password: DataTypes.STRING,
// ambulance_provider_id: DataTypes.INTEGER
const createDriverAccountDB = async (email, phone_number, first_name, last_name, hashedPassword, ambulance_provider_id) => {
    return driverAccounts.create({
        email: email,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
        ambulance_provider_id: ambulance_provider_id
    });
}

const updateDriverAccountDB = async (driver_id, updates) => {
  const [affectedRows] = await driverAccounts.update(updates, {
    where: {
      id: driver_id,
    },
  });

  if (affectedRows === 0) {
    throw new CustomError("Driver account not found or no changes made", 404);
  }

  return driverAccounts.findOne({
    where: {
      id: driver_id,
    },
  });
};

const deleteDriverAccountDB = async (driver_id) => {
  const driver = await driverAccounts.findOne({
    where: {
      id: driver_id,
    },
  });

  if (!driver) {
    throw new CustomError("Driver account not found", 404);
  }

  await driverAccounts.destroy({
    where: {
      id: driver_id,
    },
  });

  return { message: "Driver account deleted successfully" };
};

const getDriverAccountByIdDB = async (driver_id) => {
  return await driverAccounts.findOne({
    where: {
      id: driver_id,
    },
  });
};

const findDriverAccountByEmailDB = async (email) => {
  try {
    return await driverAccounts.findOne({
      where: {
        email,
      },
      include: [
        {
          model: models.AmbulanceProviders,
          as: "ambulance_provider_driverAccounts",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const findDriverAccountByIdDB = async (id) => {
  try {
    return await driverAccounts.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const findDriverAccountByHospitalDB = async (ambulance_provider_id) => {
  try {
    return await driverAccounts.findAll({
      where: {
        ambulance_provider_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordDriverAccountDB = async (email, newHashedPassword) => {
  try {
    return await driverAccounts.update(
      {
        password: newHashedPassword,
      },
      {
        where: {
          email,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const insertFcmtokenDB = async (id, fcm_token) => {
  try {
    return await driverAccounts.update(
      {
        fcm_token,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteFcmTokenDB = async (id) => {
  try {
    return await driverAccounts.update(
      {
        fcm_token: null,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const FindAllDriverByAmbulanceProviderDB = async (ambulance_provider_id) => {
  try {
    return await driverAccounts.findAll({
      where: {
        ambulance_provider_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateIsOccupiedDriverDB = async (id, is_occupied) => {
  try {
    return await driverAccounts.update(
      {
        is_occupied,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getAllDriverAccountsDB = async (filterParams) => {
  try {
    // Build the query options based on filter parameters
    const queryOptions = {
      where: {},
      include: [
        {
          model: models.AmbulanceProviders,
          as: "ambulance_provider_driverAccounts",
          include: [
            {
              model: models.Kota,
              as: "kota_ambulanceProviders",
              include: [
                {
                  model: models.Provinsi,
                  as: "provinsi_kota",
                },
              ],
            },
          ],
          attributes: { exclude: ["password"] },
        },
      ],
      attributes: { exclude: ["password"] },
    };

    // Add filter conditions
    if (filterParams.ambulance_provider_id) {
      queryOptions.where["ambulance_provider_id"] =
        filterParams.ambulance_provider_id;
    }

    if (filterParams.kota_id) {
      queryOptions.include[0].where = queryOptions.include[0].where || {};
      queryOptions.include[0].where["kota_id"] = filterParams.kota_id;
    }

    if (filterParams.provinsi_id) {
      queryOptions.include[0].include[0].where =
        queryOptions.include[0].include[0].where || {};
      queryOptions.include[0].include[0].where["provinsi_id"] =
        filterParams.provinsi_id;
    }

    return await models.DriverAccounts.findAll(queryOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDriverAccountDB,
  findDriverAccountByEmailDB,
  findDriverAccountByHospitalDB,
  findDriverAccountByIdDB,
  resetPasswordDriverAccountDB,
  insertFcmtokenDB,
  deleteFcmTokenDB,
  FindAllDriverByAmbulanceProviderDB,
  updateIsOccupiedDriverDB,
  getAllDriverAccountsDB,
  updateDriverAccountDB,
  deleteDriverAccountDB,
  getDriverAccountByIdDB,
};