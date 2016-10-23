'use strict';
var path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

var authentication = new LocalStrategy(
    (name, password, done) => {
        models.users.findOne({
            where: {
                'name': name
            },
            attributes: ['salt', 'password', 'id', 'name', 'isAdmin']
        }).then(user => {
            if (user === null) {
                return done(null, false, {
                    noUser: true
                });
            }
            bcrypt.hash(password, user.salt, undefined, (err, hash) => {
                if (err) {
                    return done(null, false, err);
                }
                if (hash === user.password) {
                    return done(null, {
                        id: user.id,
                        name: user.name,
                        isAdmin: user.isAdmin
                    });
                } else {
                    return done(null, false, {
                        user: user.name
                    });
                }
            });
        }).catch(err => done(null, false, err));
    }
);

module.exports = authentication;
