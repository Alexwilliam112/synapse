'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventlogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      processName: {
        type: Sequelize.STRING
      },
      caseId: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING
      },
      eventName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Eventlogs');
  }
};