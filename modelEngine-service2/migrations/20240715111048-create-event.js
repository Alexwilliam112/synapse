'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.FLOAT
      },
      time: {
        type: Sequelize.FLOAT
      },
      benchmarkTime: {
        type: Sequelize.FLOAT
      },
      isTextEditable: {
        type: Sequelize.BOOLEAN
      },
      color: {
        type: Sequelize.STRING
      },
      shape: {
        type: Sequelize.STRING
      },
      ProcessId: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};