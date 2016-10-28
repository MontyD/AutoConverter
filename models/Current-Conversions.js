module.exports = (sequelize, DataTypes) => {
    'use strict';
    let Current = sequelize.define('currentConversions', {
        name: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        status: {
          type: DataTypes.ENUM('Uploaded', 'Queued', 'Paused', 'Converting')
        },
        config: {
          type: DataTypes.JSON
        },
        username: {
          type: DataTypes.STRING
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Current;
};
