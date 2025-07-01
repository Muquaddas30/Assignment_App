'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Quiz',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
