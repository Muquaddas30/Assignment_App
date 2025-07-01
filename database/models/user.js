'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  role: {
    type: Sequelize.ENUM('admin', 'teacher', 'student'),
    allowNull: false,
  },

},
  {
    freezeTableName: true,
    timestamps: false,
    paranoid: true,

  });
// user association
User.associate = function (models) {
  User.hasMany(models.Quiz, {
    foreignKey: 'teacherId',
    as: 'quizzes'
  });
};

module.exports = User;
