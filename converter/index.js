'use strict';

const fs = require('fs'),
	path = require('path'),
	mv = require('mv'),
	ncp = require('ncp').ncp,
	rimraf = require('rimraf'),
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
	return new Promise((resolve, reject) => {
		const uploadsPath = path.join(basePath, conversion.path);
		const queuedPath = path.join(basePath, 'files', 'queue', String(conversion.id), conversion.name);
		const iniPath = path.join(basePath, 'files', 'queue', String(conversion.id), 'config.ini');
		mv(uploadsPath, queuedPath, {
			mkdirp: true
		}, err => {
			if(err) {
				return reject(err);
			}
			let conversionData = conversion.get();
			conversionData.path = queuedPath;
			let iniString = ini.stringify(conversionData);
			fs.writeFile(iniPath, iniString, err => {
				if(err) {
					return reject(err);
				}
				// reference to model level, as instance level did not allow path to update
				models.currentConversions.findById(conversion.id)
					.then(conversionInstance => {
						conversionInstance.update({
								status: 'Queued',
								path: queuedPath
							}, {
								where: {
									id: conversion.id
								}
							})
							.then(updatedConversion => {
								resolve(updatedConversion);
							})
							.catch(err => reject(err));
					})
					.catch(err => reject(err));
			});
		});
	});

};


converter.convert = conversion => {
	let currentDir = path.join(basePath, conversion.path.replace(conversion.name, ''));
	let conversionDir = path.join(basePath, 'files', 'converting');
	ncp(currentDir, conversionDir, {
		clobber: true
	}, err => {
		if(err) {
			return console.error(err);
		}
	});
};

converter.removeFiles = conversion => {
	return new Promise((resolve, reject) => {
		let absolutePath;
		if(conversion.path.substring(0, 5) === 'files') {
			absolutePath = path.resolve(basePath, conversion.path);
		} else {
			absolutePath = path.resolve(conversion.path);
		}
		switch (conversion.status) {
			case 'Uploaded':
				fs.unlink(absolutePath, err => {
					if(err) {
						return reject(err);
					}
					return resolve();
				});
				break;
			case 'Queued':
				absolutePath = absolutePath.replace(conversion.name, '');
				rimraf(absolutePath, {}, err => {
					if (err) {
						return reject(err);
					}
					return resolve();
				});
				break;
			default:
				reject('Unable to delete due to conversion status');
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
