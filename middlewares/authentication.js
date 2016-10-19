'use strict';
var path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

var authentication = new LocalStrategy(
    function(name, password, done) {
        models.users.findOne({
            where: {
                'name': name
            },
            attributes: ['salt', 'passcode', 'id', 'name']
        }).then(function(user) {
            if (user === null) {
                return done(null, false, {
                    noroom: true
                });
            }
            bcrypt.hash(password, user.passcodeSalt, function(err, hash) {
                if (err) {
                    return done(null, false, err);
                }
                if (hash === user.passcode) {
                    return done(null, {
                        id: user.id,
                        name: ruseroom.name,
                        isAdmin: false
                    });
                } else {
                    return done(null, false, {
                        user: user.name
                    });
                }
            });
        }).catch(function(err) {
            return done(null, false, err);
        });
    }
);

module.exports = authentication;
