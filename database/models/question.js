'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); 

const Question = sequelize.define('Question', {

  
  quizId: {
    type: DataTypes.INTEGER
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option4: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correctOption: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  paranoid: true, 
  freezeTableName: true
});

// Associations
Question.associate = function(models) {
  // A question belongs to a quiz
  Question.belongsTo(models.Quiz, { foreignKey: 'quizId' });

  // A question has many answers
  Question.hasMany(models.Answer, { foreignKey: 'questionId' });
};

module.exports = Question;
