'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quizId: {
    type: DataTypes.INTEGER
  },
  studentId: {
    type: DataTypes.INTEGER
  },
  submittedAt: {
    type: DataTypes.DATE
  },
  isSubmitted: {
    type: DataTypes.BOOLEAN
  },
  score: {
    type: DataTypes.INTEGER
  },
  remarks: {
    type: DataTypes.STRING
  }
}, {

  freezeTableName: true,
  timestamps: false,
  paranoid: true,
});

Submission.associate = function (models) {
  // Each submission belongs to one quiz
  Submission.belongsTo(models.Quiz, { foreignKey: 'quizId' });

  // Each submission belongs to one student (User)
  Submission.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });

  // Each submission has many answers
  Submission.hasMany(models.Answer, { foreignKey: 'submissionId' });

  // Each submission has one grade
  Submission.hasOne(models.Grade, { foreignKey: 'submissionId' });
};

module.exports = Submission;
