'use strict';

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    passport = require('passport'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    checkUser = require(path.join(__dirname, '..', 'middlewares', 'checkUser')),
    isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
    passUser = require(path.join(__dirname, '..', 'middlewares', 'passUser')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));


// Passport auth
function authenticateUser(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            var redirect = req.body.originalURL || '/';
            return res.redirect(redirect);
        });
    })(req, res, next);
}

// Get - register page
router.get('/login', function(req, res, next) {
    req.logout();
    res.render('security/login');
});

// Post login - authenticate
router.post('/login', authenticateUser);


// Post register
router.post('/', function(req, res, next) {
    // Ensure the admin boolean is an actual boolean.
    let newUser = req.body;
    newUser.isAdmin = !!req.body.isAdmin;
    models.users.create(req.body).then(function(newUser) {
        res.json({
            name: newUser.name
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

// PUT update
router.put('/', respondsToJSON, checkUser, isAdmin, function(req, res, next) {
    models.users.findById(req.user.id, {
        attributes: ['id']
    }).then(function(user) {
        // Ensure the admin boolean is an actual boolean.
        let updatedUser = req.body;
        updatedUser.isAdmin = !!req.body.isAdmin;
        // hash and salting done at model level
        user.update(req.body).then(function() {
            res.sendStatus(200);
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

router.get('/is-unique', respondsToJSON, function(req, res, next) {
    if (!req.query.name) {
        var error = new Error('Bad get request');
        error.status = 400;
        return next(error);
    }
    models.users.find({
        where: {
            name: req.query.name
        },
        attributes: ['name']
    }).then(function(user) {
        if (user) {
            res.json(false);
        } else {
            res.json(true);
        }
    }).catch(function(err) {
        return handleError(err, next);
    });
});


router.delete('/', respondsToJSON, checkUser, isAdmin, function(req, res, next) {
    models.users.findById(req.user.id, {
        attributes: ['id']
    }).then(function(user) {
        user.destroy().then(function() {
            res.sendStatus(200);
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

// DELETE session - echo log out
router.delete('/log-all-out', respondsToJSON, checkUser, isAdmin, function(req, res, next) {
    res.io.emit('logAllOut', 'true');
    res.sendStatus(200);
});


module.exports = router;
