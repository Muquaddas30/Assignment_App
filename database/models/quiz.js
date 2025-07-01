'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); 

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'pending', 'submitted'),
    allowNull: false,
    defaultValue: 'pending'
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  paranoid: true, 
  freezeTableName: true
});

Quiz.associate = function(models) {
  Quiz.belongsTo(models.User, {
    foreignKey: 'teacherId',
    as: 'teacher'
  });

  Quiz.hasMany(models.Question, {
    foreignKey: 'quizId'
  });

  Quiz.hasMany(models.Submission, {
    foreignKey: 'quizId'
  });
};

module.exports = Quiz;
