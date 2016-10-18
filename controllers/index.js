'use strict';

const express = require('express'),
    router = express.Router(),
    setupRouter = express.Router(),
    path = require('path'),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
    passUser = require(path.join(__dirname, '..', 'middlewares', 'passUser'));

router.get('/', function(req, res, next) {
    res.render('index');
});





//** Setup routing, if database not complete
setupRouter.get('/', function(req, res, next) {
  res.render('setup/index');
});

module.exports = {
    live: router,
    setup: setupRouter
};
