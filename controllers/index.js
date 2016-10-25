'use strict';

const express = require('express'),
    router = express.Router(),
    setupRouter = express.Router(),
    path = require('path'),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    checkUser = require(path.join(__dirname, '..', 'middlewares', 'checkUser')),
    isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
    passUser = require(path.join(__dirname, '..', 'middlewares', 'passUser'));

router.get(['/', '/new', '/configure', '/queue', '/done'], checkUser, (req, res, next) => res.render('index'));



router.use('/users', require('./Users.js'));

router.use('/converters', respondsToJSON, checkUser, require('./Converters.js'));

router.use('/conversions', respondsToJSON, checkUser, require('./Conversions.js'));

router.use('/configuration', respondsToJSON, checkUser, isAdmin, require('./Config.js'));





//** Setup routing, if database not complete
//** allow certain APIs, but redirect all others
//** to setup view.
setupRouter.use('/users', require('./Users.js'));

setupRouter.use('/converters', require('./Converters.js'));

setupRouter.use('/config', require('./Config.js'));

setupRouter.get('*', (req, res, next) => res.render('setup/index'));

module.exports = {
    live: router,
    setup: setupRouter
};
