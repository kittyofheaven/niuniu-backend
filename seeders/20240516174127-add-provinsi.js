'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provinsis', [
      { id: 1, name: 'Aceh', location: Sequelize.fn('ST_GeomFromText', 'POINT(5.548290 95.323753)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Sumatera Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(3.597031 98.678513)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Sumatera Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-0.949244 100.354271)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Riau', location: Sequelize.fn('ST_GeomFromText', 'POINT(0.507068 101.447777)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Jambi', location: Sequelize.fn('ST_GeomFromText', 'POINT(-1.610870 103.613121)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Sumatera Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-2.990934 104.756555)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Bengkulu', location: Sequelize.fn('ST_GeomFromText', 'POINT(-3.795555 102.259590)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Lampung', location: Sequelize.fn('ST_GeomFromText', 'POINT(-5.448839 105.286276)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Kepulauan Bangka Belitung', location: Sequelize.fn('ST_GeomFromText', 'POINT(-2.741051 106.440587)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Kepulauan Riau', location: Sequelize.fn('ST_GeomFromText', 'POINT(3.945712 108.142866)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'DKI Jakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.208763 106.845599)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Jawa Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.914744 107.609810)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Jawa Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.005145 110.438125)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'DI Yogyakarta', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.797068 110.370529)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Jawa Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.250445 112.768845)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'Banten', location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.110367 106.163974)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Bali', location: Sequelize.fn('ST_GeomFromText', 'POINT(-8.340539 115.092259)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Nusa Tenggara Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-8.652933 117.361647)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Nusa Tenggara Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(-10.177167 123.607032)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Kalimantan Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-0.022654 109.334222)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Kalimantan Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(-2.210091 113.921327)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Kalimantan Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-3.000000 115.500000)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Kalimantan Timur', location: Sequelize.fn('ST_GeomFromText', 'POINT(0.538381 116.419389)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Kalimantan Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(3.000000 116.000000)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Sulawesi Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(1.493056 124.841289)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 26, name: 'Sulawesi Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(-0.882458 119.859571)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 27, name: 'Sulawesi Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-4.543140 119.746094)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'Sulawesi Tenggara', location: Sequelize.fn('ST_GeomFromText', 'POINT(-4.129671 122.168604)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Gorontalo', location: Sequelize.fn('ST_GeomFromText', 'POINT(0.699889 122.446723)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 30, name: 'Sulawesi Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-2.844900 119.232077)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Maluku', location: Sequelize.fn('ST_GeomFromText', 'POINT(-3.238461 130.145273)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 32, name: 'Maluku Utara', location: Sequelize.fn('ST_GeomFromText', 'POINT(1.570999 127.808769)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 33, name: 'Papua', location: Sequelize.fn('ST_GeomFromText', 'POINT(-4.269928 138.080353)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 34, name: 'Papua Barat', location: Sequelize.fn('ST_GeomFromText', 'POINT(-0.891687 134.064018)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 35, name: 'Papua Selatan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.450532 138.516872)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 36, name: 'Papua Pegunungan', location: Sequelize.fn('ST_GeomFromText', 'POINT(-4.083739 138.926919)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 37, name: 'Papua Tengah', location: Sequelize.fn('ST_GeomFromText', 'POINT(-3.677161 137.201264)'), createdAt: new Date(), updatedAt: new Date() },
      { id: 38, name: 'Papua Barat Daya', location: Sequelize.fn('ST_GeomFromText', 'POINT(-0.878030 131.263193)'), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Hapus semua entri di tabel 'Provinsis'
    await queryInterface.bulkDelete('Provinsis', null, {});
  }
};