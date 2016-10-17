module.exports = function(sequelize, DataTypes) {
    'use strict';
    let Statistic = sequelize.define('statistics', {
        completed: {
            type: DataTypes.INTEGER
        },
        errored: {
          type: DataTypes.INTEGER
        },
        minutesOfTime: {
          type: DataTypes.INTEGER
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Statistic;
};
