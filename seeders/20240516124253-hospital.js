'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("niuniuhospitaltest", salt);

    await queryInterface.bulkInsert('HospitalAccounts', [
      { 
        id: 1,
        email: 'drsoetomo@test.com', 
        phone_number: '085788897671', 
        hospital_name: 'RSUD Dr Soetomo', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.75806642569326 -7.26820381224195)'), // POINT(LONGITUDE, LATTITUDE) while on google maps its (LATTITUDE, LONGITUDE)
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2,
        email: 'husadautama@test.com', 
        phone_number: '085788897672', 
        hospital_name: 'RS Husada Utama', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.75611590120036 -7.265335536486964)'), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 3,
        email: 'rsdarmosurabaya@test.com', 
        phone_number: '085788897673', 
        hospital_name: 'RSU Darmo', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.73850015433082 -7.287402250547901)'), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 4,
        email: 'gotongroyong@test.com', 
        phone_number: '085788897674', 
        hospital_name: 'RS Gotong Royong', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.78748946674773 -7.307039333797904)'), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 5,
        email: 'pusatkesehatankeputih@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'Puskesmas Keputih', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.80174314593188 -7.294032341579099)'), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HospitalAccounts', null, {});
  }
};
