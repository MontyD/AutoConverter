'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config;
if (process.env.DATABASENAME) {
    config = {
        database: process.env.DATABASE,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        dialect: process.env.DBDIALECT
    };
} else {
    config = require(path.resolve(__dirname, '../config/config.json'))[env];
}
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);


['./Converters.js', './Users.js', './Notifications.js', './Completed-Conversions.js', 'Current-Conversions.js', './config.js', './Statistics', './convertingForm.js'].forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Relationships
db.notifications.belongsTo(db.users);
db.users.hasMany(db.notifications);

db.completedConversions.belongsTo(db.users);
db.users.hasMany(db.completedConversions);

db.currentConversions.belongsTo(db.users);
db.users.hasMany(db.currentConversions);

db.users.hasOne(db.statistics);

module.exports = db;
