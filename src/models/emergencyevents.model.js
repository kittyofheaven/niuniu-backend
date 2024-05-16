'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmergencyEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmergencyEvents.belongsTo(models.UserAccounts, {
        foreignKey: 'user_id',
        as: 'user_emergencyEvents'
      });
      EmergencyEvents.belongsTo(models.DriverAccounts, {
        foreignKey: 'driver_id',
        as: 'driver_emergencyEvents'
      });
      EmergencyEvents.belongsTo(models.HospitalAccounts, {
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
    hospital_id: DataTypes.INTEGER,
    emergency_type: DataTypes.ENUM('MERAH', 'KUNING', 'HIJAU', 'PUTIH', 'HITAM'),
    number_of_patient: DataTypes.INTEGER,
    title: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN,
    is_canceled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EmergencyEvents',
  });
  return EmergencyEvents;
};