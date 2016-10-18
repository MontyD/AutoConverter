  'use strict';

  const models = require('./index.js');


  module.exports = function(sequelize, DataTypes) {
      let Converter = sequelize.define('converters', {
          name: {
              type: DataTypes.STRING,
              unique: true,
              allowNull: false
          },
          path: {
              type: DataTypes.STRING,
              unique: true,
              allowNull: false
          },
          primary: {
              type: DataTypes.BOOLEAN,
          },
      }, {
          hooks: {
            // TODO - ensure only one converter can be primary at any time
          },
          instanceMethods: {

          }
      });
      return Converter;
  };
