'use strict';

const fs = require('fs'),
	path = require('path');


const converter = {};


converter.tests = {

	openConverter: converterPath => {

			return new Promise((resolve, reject) => {
			let testPath;
			try {
				testPath = path.resolve(converterPath);
			} catch(err) {
				reject({message: `${converterPath} cannot be resolved to a valid path`});
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
						message: 'Folder not accessible or does not exist'
					});
				}
			});
		});
	}

};


module.exports = converter;
