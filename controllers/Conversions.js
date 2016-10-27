'use strict';

const express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path'),
	models = require(path.join(__dirname, '..', 'models')),
	handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
	converter = require(path.join(__dirname, '..', 'converter')),
	upload = require('multer')({
		dest: 'files/uploads/'
	});


// Get configuration
router.get('/', (req, res, next) => {
	let query = req.query;
	query.userId = req.user.id;
	models.currentConversions.findAll({where: query})
		.then(conversions => res.json(conversions))
		.catch(err => handleError(err, next));
});

router.post('/', upload.single('file'), (req, res, next) => {
	// Check the extension for sfx or ufx.
	if (!(/\.(sfx|ufx)/gi).test(path.extname(req.file.originalname))) {
		fs.unlink(path.resolve(__dirname, '..', req.file.path), () => {
			let error = new Error('Uploads must have the extension .ufx or .sfx');
			error.status = 400;
			return next(error);
		});
	} else {
		models.currentConversions.create({
			name: req.file.originalname,
			path: req.file.path,
			status: 'Uploaded',
			userId: req.user.id
		})
			.then(conversion => {
				res.io.emit('newUploaded', conversion);
				return res.json(conversion);
			})
			.catch(err => handleError(err, next));
	}
});



module.exports = router;
