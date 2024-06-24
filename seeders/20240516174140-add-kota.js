'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kota', [
      // Jawa Timur
      { id: 1, name: 'Surabaya', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.257472 112.750833)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Malang', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.977801 112.630372)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Kediri', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.824103 112.015839)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Blitar', location: Sequelize.fn('ST_GeomFromText', 'POINT(-8.095352 112.165787)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Madiun', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.629463 111.517331)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Mojokerto', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.472409 112.434937)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Pasuruan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.645000 112.907500)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Probolinggo', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.750000 113.216667)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Batu', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.883056 112.528473)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Sidoarjo', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.447822 112.718353)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Gresik', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.155558 112.653055)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },

      // Jawa Tengah
      { id: 12, name: 'Semarang', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.966667 110.420333)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Surakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.566667 110.831667)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'Magelang', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.470477 110.217686)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Salatiga', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.331389 110.502808)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'Pekalongan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.889833 109.675333)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Tegal', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.866667 109.125000)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },

      // Jawa Barat
      { id: 18, name: 'Bandung', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.917464 107.619122)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Bekasi', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.234897 106.989666)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Bogor', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.595038 106.798507)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Depok', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.402778 106.828611)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Cimahi', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.872142 107.530502)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Cirebon', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.732500 108.556944)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Sukabumi', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.921567 106.926685)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Tasikmalaya', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.350594 108.220783)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, name: 'Banjar', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.370766 108.534301)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },

      // DKI Jakarta
      { id: 27, name: 'Jakarta Pusat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.177778 106.839167)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'Jakarta Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.138889 106.895556)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Jakarta Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.1475 106.758056)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 30, name: 'Jakarta Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.295 106.820833)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Jakarta Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.225833 106.879444)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, name: 'Kepulauan Seribu', location: Sequelize.fn('ST_GeomFromText', 'POINT(-5.745 106.581667)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kota', null, {});
  }
};
