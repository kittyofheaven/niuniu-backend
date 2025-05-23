'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospital_name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      kelas: {
        allowNull: false,
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E')
      },
      location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT')
      },
      kota_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kota',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hospitals');
  }
};