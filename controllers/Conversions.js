'use strict';

const express = require('express'),
	router = express.Router(),
	path = require('path'),
	models = require(path.join(__dirname, '..', 'models')),
	handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
	converter = require(path.join(__dirname, '..', 'converter')),
	upload = require('multer')({
		dest: 'files/uploads/'
	});


// Get configuration
router.get('/', (req, res, next) => {
	models.conversions.findAll()
		.then(conversions => res.json(conversions))
		.catch(err => handleError(err, next));
});

router.post('/', upload.single('file'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.json(req.file);
});



module.exports = router;
