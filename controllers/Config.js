'use strict';

const express = require('express'),
	router = express.Router(),
	path = require('path'),
	models = require(path.join(__dirname, '..', 'models')),
	isAdmin = require(path.join(__dirname, '..', 'middlewares', 'isAdmin')),
	handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
	converter = require(path.join(__dirname, '..', 'converter')),
	email = require(path.join(__dirname, '..', 'email'));

// Get configuration
router.get('/', (req, res, next) => {
	models.config.findAll()
		.then(configuration => res.json(configuration))
		.catch(err => handleError(err, next));
});

router.get('/test', (req, res, next) => {
	models.config.findOne()
		.then(config => {
			Promise.all([
				converter.tests.accessDirectory(config.deployFolder),
				converter.tests.accessDirectory(config.convertedFoldersPath),
				converter.tests.accessDirectory(config.fallBackFoldersPath),
				email.testSMTPSettings(config)
			]).then(() => res.json({
				success: true
			})).catch(err => handleError(err, next));
		}).catch(err => handleError(err, next));
});

// Post new config - should only be called on startup.
router.post('/', (req, res, next) => {
	models.config.count().then((count) => {
		if(count > 0) {
			var err = new Error('Unable to create config - config already generated');
			err.status = 400;
			return next(err);
		}
		let newConfig = req.body;
		newConfig.smtpPort = Number(req.body.smtpPort) || null;
		newConfig.secureConnection = !!req.body.secureConnection;
		converter.tests.accessDirectory(req.body.deployFolder)
			.then(converter.tests.accessDirectory(req.body.convertedFoldersPath))
			.then(converter.tests.accessDirectory(req.body.fallBackFoldersPath))
			.then(email.testSMTPSettings(req.body))
			.then(() => {
				models.config.create(req.body).then(() => {
					res.sendStatus(200);
				}).catch(err => handleError(err, next));
			}).catch(err => handleError(err, next));
	}).catch(err => handleError(err, next));
});

// PUT update
router.put('/', isAdmin, (req, res, next) => {
	let newConfig = req.body;
	newConfig.smtpPort = Number(req.body.smtpPort) || null;
	newConfig.secureConnection = !!req.body.secureConnection;
	models.config.update(newConfig, {
		where: {}
	}).then(updatedConfig => {
		res.sendStatus(200);
	}).catch(err => handleError(err, next));
});


module.exports = router;
