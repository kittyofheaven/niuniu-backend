'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HospitalAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HospitalAccounts.hasMany(models.DriverAccounts, {
        foreignKey: 'hospital_id',
        as: 'hospital_driverAccounts'
      });
      HospitalAccounts.hasMany(models.EmergencyEvents, {
        foreignKey: 'hospital_id',
        as: 'hospital_emergencyEvents'
      });
    }
  }
  HospitalAccounts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    hospital_name: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT')
  }, {
    sequelize,
    modelName: 'HospitalAccounts',
  });
  return HospitalAccounts;
};