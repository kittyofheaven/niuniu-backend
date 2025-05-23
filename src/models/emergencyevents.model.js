'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmergencyEvents extends Model {
    static associate(models) {
      EmergencyEvents.belongsTo(models.UserAccounts, {
        foreignKey: 'user_id',
        as: 'user_emergencyEvents'
      });
      EmergencyEvents.belongsTo(models.DriverAccounts, {
        foreignKey: 'driver_id',
        as: 'driver_emergencyEvents'
      });
      EmergencyEvents.belongsTo(models.AmbulanceProviders, {
        foreignKey: 'ambulance_provider_id',
        as: 'ambulance_provider_emergencyEvents'
      });
      EmergencyEvents.belongsTo(models.Hospitals, {
        foreignKey: 'hospital_id',
        as: 'hospital_emergencyEvents'
      });
    }
  }
  EmergencyEvents.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    user_location: DataTypes.GEOMETRY('POINT'),
    driver_id: DataTypes.INTEGER,
    ambulance_provider_id: DataTypes.INTEGER,
    hospital_id: DataTypes.INTEGER,
    emergency_type: DataTypes.ENUM('MERAH', 'KUNING', 'HIJAU', 'PUTIH', 'HITAM'),
    number_of_patient: DataTypes.INTEGER,
    title: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN,
    is_canceled: DataTypes.BOOLEAN,
    rating: DataTypes.ENUM('1', '2', '3', '4', '5')
  }, {
    sequelize,
    modelName: 'EmergencyEvents',
  });
  return EmergencyEvents;
};
