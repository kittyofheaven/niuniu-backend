'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AmbulanceProviders extends Model {
    static associate(models) {
      AmbulanceProviders.hasMany(models.DriverAccounts, {
        foreignKey: 'ambulance_provider_id',
        as: 'ambulance_provider_driverAccounts'
      });
      AmbulanceProviders.hasMany(models.EmergencyEvents, {
        foreignKey: 'ambulance_provider_id',
        as: 'ambulance_provider_emergencyEvents'
      });
      AmbulanceProviders.belongsTo(models.Kota, {
        foreignKey: 'kota_id',
        as: 'kota_ambulanceProviders'
      });
    }
  }
  AmbulanceProviders.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    ambulance_provider_name: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    kota_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AmbulanceProviders',
  });
  return AmbulanceProviders;
};
