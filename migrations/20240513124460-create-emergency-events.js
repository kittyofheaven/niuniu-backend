'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmergencyEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserAccounts',
          key: 'id'
        }
      },
      user_location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT')
      },
      driver_id: {
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: 'DriverAccounts',
          key: 'id'
        }
      },
      ambulance_provider_id: {
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: 'AmbulanceProviders',
          key: 'id'
        }
      },
      hospital_id: {
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hospitals',
          key: 'id'
        }
      },
      emergency_type: {
        // allowNull: false,
        type: Sequelize.ENUM('MERAH', 'KUNING', 'HIJAU', 'PUTIH', 'HITAM')
      },
      number_of_patient: {
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      descriptions: {
        type: Sequelize.STRING
      },
      is_done: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      is_canceled: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('EmergencyEvents');
  }
};