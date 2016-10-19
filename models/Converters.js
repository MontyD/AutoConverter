  'use strict';

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
            beforeCreate: function(converter, options, cb) {
              converter.ensureOnePrimary(converter, options, cb);
            },
            beforeUpdate: function(converter, options, cb) {
              converter.ensureOnePrimary(converter, options, cb);
            }
          },
          instanceMethods: {
            ensureOnePrimary: function(converter, options, cb) {
              if (!converter.primary) {
                return cb(null, options);
              }
              sequelize.models.converters.update({primary: false}, {where: {}}).then(function(){
                return cb(null, options);
              }).catch(function(err){
                return cb(err, options);
              });
            }
          }
      });
      return Converter;
  };
