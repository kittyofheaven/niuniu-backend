'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kota', [
      // Jawa Timur
      { id: 1, name: 'Surabaya', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.750833 -7.257472)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Malang', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.630372 -7.977801)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Kediri', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.015839 -7.824103)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Blitar', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.165787 -8.095352)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Madiun', location: Sequelize.fn('ST_GeomFromText', 'POINT(111.517331 -7.629463)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Mojokerto', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.434937 -7.472409)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Pasuruan', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.907500 -7.645000)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Probolinggo', location: Sequelize.fn('ST_GeomFromText', 'POINT(113.216667 -7.750000)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Batu', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.528473 -7.883056)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Sidoarjo', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.718353 -7.447822)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Gresik', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.653055 -7.155558)'), provinsi_id: 15, createdAt: new Date(), updatedAt: new Date() },

      // Jawa Tengah
      { id: 12, name: 'Semarang', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.420333 -6.966667)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Surakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.831667 -7.566667)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'Magelang', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.217686 -7.470477)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Salatiga', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.502808 -7.331389)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'Pekalongan', location: Sequelize.fn('ST_GeomFromText', 'POINT(109.675333 -6.889833)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Tegal', location: Sequelize.fn('ST_GeomFromText', 'POINT(109.125000 -6.866667)'), provinsi_id: 13, createdAt: new Date(), updatedAt: new Date() },

      // Jawa Barat
      { id: 18, name: 'Bandung', location: Sequelize.fn('ST_GeomFromText', 'POINT(107.619122 -6.917464)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Bekasi', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.989666 -6.234897)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Bogor', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.798507 -6.595038)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Depok', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.828611 -6.402778)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Cimahi', location: Sequelize.fn('ST_GeomFromText', 'POINT(107.530502 -6.872142)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Cirebon', location: Sequelize.fn('ST_GeomFromText', 'POINT(108.556944 -6.732500)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Sukabumi', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.926685 -6.921567)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Tasikmalaya', location: Sequelize.fn('ST_GeomFromText', 'POINT(108.220783 -7.350594)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, name: 'Banjar', location: Sequelize.fn('ST_GeomFromText', 'POINT(108.534301 -7.370766)'), provinsi_id: 12, createdAt: new Date(), updatedAt: new Date() },

      // DKI Jakarta
      { id: 27, name: 'Jakarta Pusat', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.839167 -6.177778)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'Jakarta Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.895556 -6.138889)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Jakarta Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.758056 -6.1475)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 30, name: 'Jakarta Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.820833 -6.295)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Jakarta Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.879444 -6.225833)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, name: 'Kepulauan Seribu', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.581667 -5.745)'), provinsi_id: 11, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kota', null, {});
  }
};
