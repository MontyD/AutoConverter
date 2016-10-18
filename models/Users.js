var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    'use strict';
    let User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: ['^[a-z0-9]+$', 'i'],
                len: {
                    args: [4, 20],
                    msg: 'Please enter a username consisting of only letters and numbers between five and twenty characters long'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 70],
                    msg: 'Please enter a passcode between five and seventy characters long'
                }
            }
        },
        salt: DataTypes.STRING,
        email: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        hooks: {
            beforeCreate: function(user, options, cb) {
                user.hashPassword(user, options, cb);
            },
            beforeUpdate: function(user, options, cb) {
                user.hashPassword(user, options, cb);
            }
        },
        instanceMethods: {
            hashPassword: function(user, options, cb) {
                bcrypt.genSalt(12, function(err, salt) {
                    if (err) {
                        return cb(err, options);
                    }
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        if (err) {
                            return cb(err, options);
                        }
                        user.password = hash;
                        user.salt = salt;
                        return cb(null, options);
                    });
                });
            }
        }
    });
    return User;
};
