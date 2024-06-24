'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("niuniuambulance_providertest", salt);

    await queryInterface.bulkInsert('AmbulanceProviders', [
      {
        id: 1,
        email: 'drsoetomo@test.com',
        phone_number: '085788897671',
        ambulance_provider_name: 'RSUD Dr Soetomo',
        password: hashedPassword,
        // kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.26820381224195 112.75806642569326)'), // swapped latitude and longitude
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'husadautama@test.com',
        phone_number: '085788897672',
        ambulance_provider_name: 'RS Husada Utama',
        password: hashedPassword,
        // kelas: 'B',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.265335536486964 112.75611590120036)'), // swapped latitude and longitude
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'rsdarmosurabaya@test.com',
        phone_number: '085788897673',
        ambulance_provider_name: 'RSU Darmo',
        password: hashedPassword,
        // kelas: 'C',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.287402250547901 112.73850015433082)'), // swapped latitude and longitude
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: 'gotongroyong@test.com',
        phone_number: '085788897674',
        ambulance_provider_name: 'RS Gotong Royong',
        password: hashedPassword,
        // kelas: 'C',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.307039333797904 112.78748946674773)'), // swapped latitude and longitude
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        email: 'pusatkesehatankeputih@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'Puskesmas Keputih',
        password: hashedPassword,
        // kelas: 'D',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.294032341579099 112.80174314593188)'), // swapped latitude and longitude
        kota_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        email: 'rsudsidoarjobarat@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RSUD Sidoarjo Barat',
        password: hashedPassword,
        // kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.406545813965696 112.58488933898717)'), // swapped latitude and longitude
        kota_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        email: 'deltasuryasidoarjo@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RS Delta Surya Sidoarjo',
        password: hashedPassword,
        // kelas: 'C',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.447134230900902 112.70157036782365)'), // swapped latitude and longitude
        kota_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        email: 'ciptomangunkusumo@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RSUPN Dr. Cipto Mangunkusumo',
        password: hashedPassword,
        // kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.197559440585179 106.84686978871808)'), // swapped latitude and longitude
        kota_id: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        email: 'abdiwaluyo@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RS Abdi Waluyo',
        password: hashedPassword,
        // kelas: 'B',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.189851660085455 106.82905851199544)'), // swapped latitude and longitude
        kota_id: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        email: 'rsupkariadi@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RSUP Dr. Kariadi',
        password: hashedPassword,
        // kelas: 'A',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.994201144009988 110.40751115432857)'), // swapped latitude and longitude
        kota_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        email: 'rsudtugurejo@test.com',
        phone_number: '085788897675',
        ambulance_provider_name: 'RSUD Tugurejo',
        password: hashedPassword,
        // kelas: 'B',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.984092686665531 110.35484254109745)'), // swapped latitude and longitude
        kota_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AmbulanceProviders', null, {});
  }
};
