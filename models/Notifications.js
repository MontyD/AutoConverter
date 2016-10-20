module.exports = (sequelize, DataTypes) => {
    'use strict';
    let Notification = sequelize.define('notifications', {
        text: {
            type: DataTypes.STRING
        },
        seen: {
            type: DataTypes.BOOLEAN
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Notification;
};
