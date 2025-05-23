'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provinsi.hasMany(models.Kota, {
        foreignKey: 'provinsi_id',
        as: 'provinsi_kota'
      });
    }
  }
  Provinsi.init({
    name: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT')
  }, {
    sequelize,
    modelName: 'Provinsi',
    tableName: 'Provinsis'
  });
  return Provinsi;
};