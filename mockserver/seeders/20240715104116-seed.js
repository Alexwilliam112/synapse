'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = require('../data/eventlogs.json').map((el) => {
      el.createdAt = el.updatedAt = new Date()
      el.timestamp = new Date(el.timestamp)
      return el
    })
    await queryInterface.bulkInsert('Eventlogs', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
