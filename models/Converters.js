module.exports = function(sequelize, DataTypes) {
  'use strict';
    let Converter = sequelize.define('converters', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        path: {
          type: DataTypes.STRING,
          unique: true
        },
        primary: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        hooks: {
            beforeCreate: function(converter, options, cb) {
                // TODO - ensure that if primary is set - it is untrue on all other converters.
            },
        },
        instanceMethods: {

        }
    });
    return Converter;
};
