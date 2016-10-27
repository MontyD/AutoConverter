module.exports = (sequelize, DataTypes) => {
    'use strict';
    let Converting = sequelize.define('convertingForm', {
        name: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        config: {
          type: DataTypes.JSON
        },
        error: {
          type: DataTypes.STRING
        },
        retry: {
          type: DataTypes.INTEGER
        },
        abort: {
          type: DataTypes.BOOLEAN,
          default: false
        }
    }, {
        hooks: {},
        instanceMethods: {}
    });
    return Converting;
};
