'use strict';

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
    converter = require(path.join(__dirname, '..', 'converter'));

// Get converters
router.get('/', function(req, res, next) {
    models.converters.findAll().then(function(converters) {
        res.json(converters);
    }).catch(function(err) {
        handleError(err, next);
    });
});

// Post new converter
router.post('/', function(req, res, next) {
    // Ensure the primary boolean is an actual boolean.
    let newConverter = req.body;
    newConverter.primary = !!req.body.primary;
    converter.tests.openConverter(req.body.path).then(function() {
        models.converters.create(req.body).then(function(newConverter) {
            res.json({
                name: newConverter.name
            });
        }).catch(function(err) {
            handleError(err, next);
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

module.exports = router;
