'use strict';
const fs = require('fs');
const path = require('path');
const { start } = require('repl');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // [LATITUDE, LONGITUDE]
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
        location: Sequelize.fn('ST_GeomFromText', `POINT(${hospital.lat} ${hospital.lng})`),
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
