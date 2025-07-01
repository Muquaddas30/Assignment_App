'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); 

const Grade = sequelize.define('Grade', {
  submissionId: {
    type: DataTypes.INTEGER
  },
  score: {
    type: DataTypes.INTEGER
  },
  remarks: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  paranoid: true, 
  freezeTableName: true
});


Grade.associate = function(models) {
  // Each Grade belongs to one Submission
  Grade.belongsTo(models.Submission, { foreignKey: 'submissionId' });
};
 
module.exports = Grade;
