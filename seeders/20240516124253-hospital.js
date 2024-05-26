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
        kelas: 'A', 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.75806642569326 -7.26820381224195)'), // POINT(LONGITUDE, LATTITUDE) while on google maps its (LATTITUDE, LONGITUDE)
        kota_id: 1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2,
        email: 'husadautama@test.com', 
        phone_number: '085788897672', 
        hospital_name: 'RS Husada Utama', 
        password: hashedPassword, 
        kelas: 'B',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.75611590120036 -7.265335536486964)'),
        kota_id: 1, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 3,
        email: 'rsdarmosurabaya@test.com', 
        phone_number: '085788897673', 
        hospital_name: 'RSU Darmo',
        kelas: 'C',
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.73850015433082 -7.287402250547901)'),
        kota_id: 1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 4,
        email: 'gotongroyong@test.com', 
        phone_number: '085788897674', 
        hospital_name: 'RS Gotong Royong',
        kelas: 'C', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.78748946674773 -7.307039333797904)'), 
        kota_id: 1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 5,
        email: 'pusatkesehatankeputih@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'Puskesmas Keputih',
        kelas: 'D', 
        password: hashedPassword, 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.80174314593188 -7.294032341579099)'), 
        kota_id: 1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 6,
        email: 'rsudsidoarjobarat@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RSUD Sidoarjo Barat', 
        password: hashedPassword, 
        kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.58488933898717 -7.406545813965696)'),
        kota_id: 10,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 7,
        email: 'deltasuryasidoarjo@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RS Delta Surya Sidoarjo', 
        password: hashedPassword, 
        kelas: 'C',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(112.70157036782365 -7.447134230900902)'),
        kota_id: 10,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 8,
        email: 'ciptomangunkusumo@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RSUPN Dr. Cipto Mangunkusumo', 
        password: hashedPassword,
        kelas: 'A', 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(106.84686978871808 -6.197559440585179)'), 
        kota_id: 27,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 9,
        email: 'abdiwaluyo@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RS Abdi Waluyo', 
        password: hashedPassword,
        kelas: 'B', 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(106.82905851199544 -6.189851660085455)'), 
        kota_id: 27,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 10,
        email: 'rsupkariadi@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RSUP Dr. Kariadi',
        password: hashedPassword, 
        kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(110.40751115432857 -6.994201144009988)'), 
        kota_id: 12,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 11,
        email: 'rsudtugurejo@test.com', 
        phone_number: '085788897675', 
        hospital_name: 'RSUD Tugurejo', 
        password: hashedPassword,
        kelas: 'B', 
        location: Sequelize.fn('ST_GeomFromText', 'POINT(110.35484254109745 -6.984092686665531)'), 
        kota_id: 12,
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HospitalAccounts', null, {});
  }
};
