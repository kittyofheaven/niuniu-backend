'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DriverAccounts.belongsTo(models.AmbulanceProviders, {
        foreignKey: 'ambulance_provider_id',
        as: 'ambulance_provider_driverAccounts'
      });
      DriverAccounts.hasMany(models.EmergencyEvents, {
        foreignKey: 'driver_id',
        as: 'driver_emergencyEvents'
      });
    }
  }
  DriverAccounts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    ambulance_provider_id: DataTypes.INTEGER,
    is_occupied: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DriverAccounts',
  });
  return DriverAccounts;
};