'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provinsis', [
      { id: 1, name: 'Aceh', location: Sequelize.fn('ST_GeomFromText', 'POINT(95.323753 5.548290)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Sumatera Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(98.678513 3.597031)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Sumatera Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(100.354271 -0.949244)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Riau', location: Sequelize.fn('ST_GeomFromText', 'POINT(101.447777 0.507068)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Jambi', location: Sequelize.fn('ST_GeomFromText', 'POINT(103.613121 -1.610870)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Sumatera Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(104.756555 -2.990934)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Bengkulu', location: Sequelize.fn('ST_GeomFromText', 'POINT(102.259590 -3.795555)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Lampung', location: Sequelize.fn('ST_GeomFromText', 'POINT(105.286276 -5.448839)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Kepulauan Bangka Belitung', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.440587 -2.741051)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Kepulauan Riau', location: Sequelize.fn('ST_GeomFromText', 'POINT(108.142866 3.945712)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'DKI Jakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.845599 -6.208763)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Jawa Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(107.609810 -6.914744)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Jawa Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.438125 -7.005145)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'DI Yogyakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(110.370529 -7.797068)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Jawa Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(112.768845 -7.250445)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'Banten', location: Sequelize.fn('ST_GeomFromText', 'POINT(106.163974 -6.110367)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Bali', location: Sequelize.fn('ST_GeomFromText', 'POINT(115.092259 -8.340539)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Nusa Tenggara Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(117.361647 -8.652933)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Nusa Tenggara Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(123.607032 -10.177167)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Kalimantan Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(109.334222 -0.022654)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Kalimantan Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(113.921327 -2.210091)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Kalimantan Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(115.500000 -3.000000)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Kalimantan Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(116.419389 0.538381)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Kalimantan Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(116.000000 3.000000)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Sulawesi Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(124.841289 1.493056)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 26, name: 'Sulawesi Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(119.859571 -0.882458)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 27, name: 'Sulawesi Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(119.746094 -4.543140)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'Sulawesi Tenggara', location: Sequelize.fn('ST_GeomFromText', 'POINT(122.168604 -4.129671)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Gorontalo', location: Sequelize.fn('ST_GeomFromText', 'POINT(122.446723 0.699889)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 30, name: 'Sulawesi Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(119.232077 -2.844900)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Maluku', location: Sequelize.fn('ST_GeomFromText', 'POINT(130.145273 -3.238461)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 32, name: 'Maluku Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(127.808769 1.570999)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 33, name: 'Papua', location: Sequelize.fn('ST_GeomFromText', 'POINT(138.080353 -4.269928)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 34, name: 'Papua Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(134.064018 -0.891687)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 35, name: 'Papua Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(138.516872 -7.450532)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 36, name: 'Papua Pegunungan', location: Sequelize.fn('ST_GeomFromText', 'POINT(138.926919 -4.083739)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 37, name: 'Papua Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(137.201264 -3.677161)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 38, name: 'Papua Barat Daya', location: Sequelize.fn('ST_GeomFromText', 'POINT(131.263193 -0.878030)'), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Hapus semua entri di tabel 'HospitalAccounts'
    await queryInterface.bulkDelete('Provinsis', null, {});
  }
};