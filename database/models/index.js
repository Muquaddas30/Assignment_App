'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname, '../../config/config'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all models that directly export a Sequelize model (not a function)
fs
  .readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath); // <- directly imported Sequelize model

    db[model.name] = model;
  });

// console.log({ db })

// Set up associations if defined
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

// Sync all models (optional: only in dev)
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('✅ All models synced successfully.');
//   })
//   .catch(err => {
//     console.error('❌ Model sync error:', err);
//   });

// db.User.sync({ alter: true })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

global.models = db;
module.exports = db;
