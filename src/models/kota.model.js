'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kota.belongsTo(models.Provinsi, {
        foreignKey: 'provinsi_id',
        as: 'provinsi_kota'
      });
      Kota.hasMany(models.HospitalAccounts, {
        foreignKey: 'kota_id',
        as: 'kota_hospitalAccounts'
      });
    }
  }
  Kota.init({
    name: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    provinsi_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kota',
  });
  return Kota;
};