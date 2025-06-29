'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Question', {
      quizId: {
        type: Sequelize.INTEGER
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option3: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option4: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correctOption: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Question');
  }
};
