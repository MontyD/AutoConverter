module.exports = function(sequelize, DataTypes) {
    'use strict';
    let Config = sequelize.define('config', {
        url: {
            type: DataTypes.STRING,
            validate: {
              isUrl: true
            }
        },
        smtpHost: {
            type: DataTypes.STRING
        },
        smtpUsername: {
          type: DataTypes.STRING
        },
        smtpPassword: {
          type: DataTypes.STRING
        },
        smtpPort: {
          type: DataTypes.INTEGER
        },
        secureConnection: {
          type: DataTypes.BOOLEAN
        },
        fromAddress: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true
          }
        },
        deployFolder: {
          type: DataTypes.STRING
        },
        convertedFoldersPath: {
          type: DataTypes.STRING
        },
        fallBackFoldersPath: {
          type: DataTypes.STRING
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Config;
};
