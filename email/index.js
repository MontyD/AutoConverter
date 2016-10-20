'use strict';
const path = require('path'),
	nodemailer = require('nodemailer'),
	models = require(path.resolve(__dirname, '..', 'models'));

const EMAIL = {};

EMAIL.connectionTimeout = 5000;
EMAIL.smtpSettings = {};
EMAIL.transporter = undefined;

EMAIL.setSMTPSettings = function (settings) {
	let smtpSettings = {
		from: settings.fromAddress,
		host: settings.smtpHost,
		port: settings.smtpPort,
		secure: settings.secureConnection,
		ignoreTLS: true,
		connectionTimeout: EMAIL.connectionTimeout
	};
	if(settings.smtpUsername && settings.smtpPassword) {
		smtpSettings.auth = {
			user: settings.smtpUsername,
			pass: settings.smtpPassword
		};
	}
	EMAIL.smtpSettings = smtpSettings;
	EMAIL.transporter = nodemailer.createTransport(smtpSettings);
};

EMAIL.testSMTPSettings = function (settings) {

	EMAIL.setSMTPSettings(settings);
	return new Promise(function (resolve, reject) {
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
			return EMAIL.sendSetupEmail(admin.email).then(resolve).catch(reject);
		}).catch(reject);
	});

};

EMAIL.checkExistingSMTPSettings = function () {
	return new Promise(function (resolve, reject) {
		models.config.findAll().then(function (configs) {
			return EMAIL.testSMTPSettings(configs[0]).then(resolve).catch(reject);
		}).catch(reject);
	});
};

EMAIL.sendSetupEmail = function (emailAddress) {
	return new Promise(function (resolve, reject) {
		EMAIL.transporter.sendMail({
			from: EMAIL.smtpSettings.from,
			to: emailAddress,
			subject: 'AutoConverter Setup',
			text: 'AutoConverter Setup',
		}, function (err, info) {
			if(err) {
				return reject(err);
			}
			return resolve(info);
		});
	});
};


module.exports = EMAIL;
