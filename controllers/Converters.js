'use strict';

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
    converter = require(path.join(__dirname, '..', 'converter'));


// Post new converter
router.post('/', function(req, res, next) {
    // Ensure the primary boolean is an actual boolean.
    let newConverter = req.body;
    newConverter.primary = !!req.body.primary;

    converter.testOpenable().then(function() {
        models.converters.create(req.body).then(function(newConverter) {
            res.json({
                name: newConverter.name
            });
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

// PUT update
router.put('/', respondsToJSON, isAdmin, function(req, res, next) {
    models.converters.findById(req.body.id, {
        attributes: ['id']
    }).then(function(converter) {
        // Ensure the admin boolean is an actual boolean.
        let updatedConverter = req.body;
        updatedConverter.primary = !!req.body.primary;
        // hash and salting done at model level
        converter.update(updatedConverter).then(function() {
            res.sendStatus(200);
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

router.delete('/', isAdmin, function(req, res, next) {
    models.converters.findById(req.user.id, {
        attributes: ['id']
    }).then(function(converter) {
        converter.destroy().then(function() {
            res.sendStatus(200);
        });
    }).catch(function(err) {
        handleError(err, next);
    });
});

module.exports = router;
