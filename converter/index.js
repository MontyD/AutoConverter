'use strict';

const fs = require('fs'),
	path = require('path'),
	mv = require('mv'),
	ncp = require('ncp').ncp,
	ini = require('ini'),
	models = require(path.resolve(__dirname, '..', 'models')),
	basePath = path.resolve(__dirname, '..');

const converter = {};

converter.converting = false;

converter.tests = {

	openConverter: converterPath => {

		return new Promise((resolve, reject) => {
			let testPath;
			try {
				testPath = path.resolve(converterPath);
			} catch(err) {
				reject({
					message: `${converterPath} cannot be resolved to a valid path`
				});
			}
			fs.access(testPath, err => {
				if(!err && converterPath.indexOf('.exe') > -1) {
					resolve();
				} else {
					reject({
						message: 'Converter path is not correct or cannot be opened.'
					});
				}
			});
		});

	},

	accessDirectory: directory => {
		return new Promise((resolve, reject) => {
			let testPath;
			try {
				testPath = path.resolve(directory);
			} catch(err) {
				console.error(err);
				reject(`${directory} cannot be resolved to a valid path`);
			}
			fs.access(testPath, fs.F_OK, err => {
				if(!err) {
					resolve();
				} else {
					reject({
						message: `${directory} is not accessible or does not exist.`
					});
				}
			});
		});
	}
};

converter.new = (conversion, config) => {
	return new Promise((resolve, reject) => {
			conversion.update({
					config: config
				})
				.then(updatedConversion => {
					converter.queue(updatedConversion)
						.then(queuedConversion => resolve(queuedConversion))
						.catch(err => err);
				})
				.catch(err => reject(err));
	});
};

converter.queue = conversion => {
	console.log('in queue');
	let uploadsPath = path.join(basePath, conversion.path);
	let queuePath = path.join(basePath, 'files', 'queue', String(conversion.id), conversion.name);
	let iniPath = path.join(basePath, 'files', 'queue', String(conversion.id), 'config.ini');
	return new Promise((resolve, reject) => {
		mv(uploadsPath, queuePath, {mkdirp:true}, err => {
			if (err) {
				return reject(err);
			}
			let conversionData = conversion.get();
			conversionData.path = queuePath;
			let iniString = ini.stringify(conversionData);
			fs.writeFile(iniPath, iniString, err => {
				if (err) {
					return reject(err);
				}
				conversion.update({status: 'Queued', path: queuePath})
					.then(queuedConversion => resolve(queuedConversion))
					.catch(err => reject(err));
			});
		});
	});

};


converter.convert = conversion => {
	let currentDir = path.join(basePath, conversion.path.replace(conversion.name, ''));
	let conversionDir = path.join(basePath, 'files', 'converting');
	ncp(currentDir, conversionDir, {clobber: true}, err => {
		if (err) {
			return console.error(err);
		}
	});
};


converter.isConverting = () => {
	return new Promise((resolve, reject) => {
		models.currentConversions.findOne({
				where: {
					status: 'Converting'
				}
			})
			.then(doc => resolve(!!doc))
			.catch(err => reject(err));
	});
};


module.exports = converter;
