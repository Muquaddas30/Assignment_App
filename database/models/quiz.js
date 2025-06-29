'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); 

const Quiz = sequelize.define('Quiz', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'pending', 'submitted'),
    allowNull: false
  }
}, {
  sequelize,
  freezeTableName: true,
  tableName: 'Quiz',
  timestamps: true
});

// Associations
Quiz.associate = function(models) {
  // Each quiz belongs to one teacher 
  Quiz.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });

  // A quiz has many questions
  Quiz.hasMany(models.Question, { foreignKey: 'quizId' });

  // A quiz has many student submissions
  Quiz.hasMany(models.Submission, { foreignKey: 'quizId' });
};

module.exports = Quiz;
