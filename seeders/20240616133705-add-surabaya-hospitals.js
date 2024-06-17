'use strict';
const fs = require('fs');
const path = require('path');
const { start } = require('repl');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // await queryInterface.bulkInsert('Hospitals', [
      // {
      //   id: 1,     
      //   hospital_name: 'RSUD Dr. Soetomo',
      //   phone_number: '0315501078',
      //   kelas: 'A',
      //   location: Sequelize.fn('ST_GeomFromText', 'POINT(112.75806642569326 -7.26820381224195)'), // POINT(LONGITUDE, LATTITUDE) while on google maps its (LATTITUDE, LONGITUDE)
      //   kota_id: 1,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   id: 2,     
      //   hospital_name: 'RSAL Dr. Ramelan',
      //   phone_number: '0318438153',
      //   kelas: 'A',
      //   location: Sequelize.fn('ST_GeomFromText', 'POINT(112.7380681448837, -7.309706051468905)'), // POINT(LONGITUDE, LATTITUDE) while on google maps its (LATTITUDE, LONGITUDE)
      //   kota_id: 1,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
    // ]);

    // POINT(LONGITUDE, LATTITUDE) while on google maps its (LATTITUDE, LONGITUDE)
    const filePath = path.join(__dirname, '../scraper/rs_surabaya_withlocation.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const hospitals = JSON.parse(jsonData);
    
    let starting_id = 1;

    const hospitalsData = hospitals.map(hospital => {
      const data = {
        id: starting_id,
        hospital_name: hospital.nama_rs,
        phone_number: hospital.nomor_telp,
        kelas: hospital.kelas,
        location: Sequelize.fn('ST_GeomFromText', `POINT(${hospital.lng} ${hospital.lat})`),
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      starting_id++;
      return data;
    });

    await queryInterface.bulkInsert('Hospitals', hospitalsData, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Hospitals', null, {});
  }
};
