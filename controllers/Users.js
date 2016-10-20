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
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            var redirect = req.body.originalURL || '/';
            return res.redirect(redirect);
        });
    })(req, res, next);
}

// Get - register page
router.get('/login', (req, res, next) => {
    req.logout();
    res.render('security/login');
});

// Post login - authenticate
router.post('/login', authenticateUser);

// Post register
router.post('/', (req, res, next) => {
    // Ensure the admin boolean is an actual boolean.
    let newUser = req.body;
    newUser.isAdmin = !!req.body.isAdmin;
    models.users.create(req.body).then(newUser => {
        res.json({
            name: newUser.name
        });
    }).catch(err => handleError(err, next));
});

// PUT update
router.put('/', respondsToJSON, checkUser, isAdmin, (req, res, next) => {
    models.users.findById(req.user.id, {
        attributes: ['id']
    }).then(user => {
        // Ensure the admin boolean is an actual boolean.
        let updatedUser = req.body;
        updatedUser.isAdmin = !!req.body.isAdmin;
        // hash and salting done at model level
        user.update(req.body).then(res.sendStatus(200)).catch(err => handleError(err, next));
    }).catch(err => handleError(err, next));
});

router.get('/is-unique', respondsToJSON, (req, res, next) => {
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
    }).then(user => {
        if (user) {
            res.json(false);
        } else {
            res.json(true);
        }
    }).catch(err => handleError(err, next));
});


router.delete('/', respondsToJSON, checkUser, isAdmin, (req, res, next) => {
    models.users.findById(req.user.id, {
        attributes: ['id']
    }).then(user => {
        user.destroy().then(res.sendStatus(200)).catch(err => handleError(err, next));
    }).catch(err => handleError(err, next));
});

// DELETE session - echo log out
router.delete('/log-all-out', respondsToJSON, checkUser, isAdmin, (req, res, next) => {
    res.io.emit('logAllOut', 'true');
    res.sendStatus(200);
});


module.exports = router;
