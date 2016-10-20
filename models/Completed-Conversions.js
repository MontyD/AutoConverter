module.exports = (sequelize, DataTypes) => {
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
        error: {
          type: DataTypes.STRING
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Completed;
};
