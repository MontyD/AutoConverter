'use strict';

const app = require('express')(),
	mailer = require('express-mailer'),
	path = require('path'),
	models = require(path.resolve(__dirname, '..', 'models')),
	fromAddress = 'autoconverter@victoriaforms.com';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const email = {};

email.testSMTPSettings = function (config) {
	return new Promise(function (resolve, reject) {
		console.log('in promise');
		mailer.extend(app, {
			from: fromAddress,
			host: config.smtpHost,
			post: config.smtpPort,
			auth: {
				user: config.smtpUsername || undefined,
				pass: config.smtpPassword || undefined,
			}
		});
		models.users.findOne({
			where: {
				isAdmin: true
			}
		}).then(function (admin) {
			if(!admin) {
				reject({
					message: 'Admin user must be signed up to test email settings'
				});
			}
			email.sendSetupEmail(admin.email).then(function () {}).catch(function (err) {
				console.log(err);
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
};

email.setSMTPSettings = function (config) {
	return new Promise(function (resolve, reject) {
		models.config.findAll().then(function (configs) {
			email.testSMTPSettings(configs[0]).then(resolve).catch(reject);
		}).catch(reject);
	});
};

email.sendSetupEmail = function (email) {
	return new Promise(function (resolve, reject) {
		app.mailer.send('Setup', {
			to: email,
			subject: 'AutoConverter Setup!'
		}, function (err) {
			if(err) {
				reject(err);
			}
			resolve();
		});
	});
};


module.exports = email;
