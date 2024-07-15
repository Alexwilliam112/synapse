'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Processes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      processName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      lastUpdate: {
        type: Sequelize.DATE
      },
      fitness: {
        type: Sequelize.INTEGER
      },
      CompanyId: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Processes');
  }
};