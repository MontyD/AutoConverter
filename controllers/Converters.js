'use strict';

const express = require('express'),
	router = express.Router(),
	path = require('path'),
	models = require(path.join(__dirname, '..', 'models')),
	isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
	handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
	converter = require(path.join(__dirname, '..', 'converter'));

// Get converters
router.get('/', (req, res, next) => {
	models.converters.findAll()
		.then(converters => res.json(converters))
		.catch(err => handleError(err, next));
});

// Post new converter
router.post('/', (req, res, next) => {
	// Ensure the primary boolean is an actual boolean.
	let newConverter = req.body;
	newConverter.primary = !!req.body.primary;
	converter.tests.openConverter(req.body.path)
		.then(() => {
			models.converters.create(req.body)
				.then(newConverter => res.json({
					name: newConverter.name
				})).catch(err => handleError(err, next));
		}).catch(err => handleError(err, next));
});

// PUT update
router.put('/', isAdmin, (req, res, next) => {
	models.converters.findById(req.body.id, {
		attributes: ['id']
	}).then(converter => {
		// Ensure the admin boolean is an actual boolean.
		let updatedConverter = req.body;
		updatedConverter.primary = !!req.body.primary;
		// hash and salting done at model level
		converter.update(updatedConverter)
      .then(() => res.sendStatus(200))
      .catch(err => handleError(err, next));
	}).catch(err => handleError(err, next));
});

router.delete('/', isAdmin, (req, res, next) => {
	models.converters.findById(req.user.id, {
		attributes: ['id']
	}).then(converter => {
		converter.destroy()
      .then(() => res.sendStatus(200))
      .catch(err => handleError(err, next));
	}).catch(err => handleError(err, next));
});

module.exports = router;
