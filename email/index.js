'use strict';
const path = require('path'),
	models = require(path.resolve(__dirname, '..', 'models'));


var app = require('express')(),
	mailer = require('express-mailer');


var fromAddress = 'autoconverter@victoriaforms.com';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const email = {};


email.setSMTPSettings = function(config) {
	let smtpSettings = {
		from: fromAddress,
		host: config.smtpHost,
		port: config.smtpPort,
		secureConnection: config.secureConnection,
	};
	if(config.smtpUsername && config.smtpPassword) {
		smtpSettings.auth = {
			user: config.smtpUsername,
			pass: config.smtpPassword
		};
	}
	return new Promise(function (resolve, reject) {
		try {
			mailer.extend(app, smtpSettings);
			resolve();
		} catch(err) {
			console.log(err);
			app.mailer.update(smtpSettings, function (err) {
				if(err) {
					reject(err);
				}
				resolve();
			});
		}
	});
};

email.testSMTPSettings = function (config) {
	return new Promise(function (resolve, reject) {
		email.setSMTPSettings(config).then(function(){
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
				return email.sendSetupEmail(admin.email).then(resolve).catch(reject);
			}).catch(reject);
		}).catch(reject);
	});
};

email.checkExistingSMTPSettings = function () {
	return new Promise(function (resolve, reject) {
		models.config.findAll().then(function (configs) {
			return email.testSMTPSettings(configs[0]).then(resolve).catch(reject);
		}).catch(reject);
	});
};

// TODO handle timeout
email.sendSetupEmail = function (email) {
	return new Promise(function (resolve, reject) {
		app.mailer.send('Setup', {
			to: email,
			subject: 'AutoConverter Setup!'
		}, function (err) {
			if(err) {
				console.log('in error');
				console.log(err);
				// closes transport by resetting SMTP details to nothing.
				app.mailer.update({
					from: 'failed@failed.com'
				}, function () {
					reject(err);
				});
			} else {
				resolve();
			}
		});
	});
};


module.exports = email;
