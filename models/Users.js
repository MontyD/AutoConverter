const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    'use strict';
    let User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: ['^[a-z0-9]|\.+$', 'i'],
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
                    msg: 'Please enter a password between five and seventy characters long'
                }
            }
        },
        salt: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        isAdmin: DataTypes.BOOLEAN
    }, {
        hooks: {
            beforeCreate: (user, options, cb) => user.hashPassword(user, options, cb),
            beforeUpdate: (user, options, cb) => user.hashPassword(user, options, cb)
        },
        instanceMethods: {
            hashPassword: (user, options, cb) => {
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) {
                        return cb(err, options);
                    }
                    bcrypt.hash(user.password, salt, undefined, (err, hash) => {
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
