  'use strict';

  module.exports = (sequelize, DataTypes) => {
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
  			beforeCreate: (converter, options, cb) => converter.ensureOnePrimary(converter, options, cb),
  			beforeUpdate: (converter, options, cb) => converter.ensureOnePrimary(converter, options, cb)
  		},
  		instanceMethods: {
  			ensureOnePrimary: (converter, options, cb) => {
  				if(!converter.primary) {
  					return cb(null, options);
  				}
  				sequelize.models.converters.update({
  					primary: false
  				}, {
  					where: {}
  				}).then(() => cb(null, options)).catch(err => cb(err, options));
  			}
  		}
  	});
  	return Converter;
  };
