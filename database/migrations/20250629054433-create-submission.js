'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grade', {
      submissionId: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.STRING
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Grade');
  }
};
