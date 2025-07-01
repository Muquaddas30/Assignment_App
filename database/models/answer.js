'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); 

const Answer = sequelize.define('Answer', {
  studentAnswer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  submissionId: {
    type: DataTypes.INTEGER
  },
  questionId: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  paranoid: true, 
  freezeTableName: true
});


Answer.associate = function(models) {
  // Answer belongs to a submission
  Answer.belongsTo(models.Submission, { foreignKey: 'submissionId' });

  // Answer belongs to a question
  Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
};

module.exports = Answer;
