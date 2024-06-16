'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospitals extends Model {
    static associate(models) {
      Hospitals.belongsTo(models.Kota, {
        foreignKey: 'kota_id',
        as: 'kota_hospitals'
      });
      Hospitals.hasMany(models.EmergencyEvents, {
        foreignKey: 'hospital_id',
        as: 'hospital_emergencyEvents'
      });
    }
  }
  Hospitals.init({
    hospital_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    kelas: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
    location: DataTypes.GEOMETRY('POINT'),
    kota_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hospitals',
  });
  return Hospitals;
};
