module.exports = function(sequelize, DataTypes) {
    'use strict';
    let Completed = sequelize.define('completedConversions', {
        name: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        status: {
          type: DataTypes.ENUM('Converted', 'Errored')
        },
        config: {
          type: DataTypes.JSON
        },
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Completed;
};
