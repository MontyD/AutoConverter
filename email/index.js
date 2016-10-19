'use strict';

const app = require('express')(),
	mailer = require('express-mailer'),
	path = require('path'),
	models = require(path.resolve(__dirname, '..', 'models')),
	fromAddress = 'autoconverter@victoriaforms.com';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const email = {};

email.setSMTPSettings = function (config) {

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
			email.sendSetupEmail(admin.email).then(resolve).catch(reject);
		}).catch(function (err) {
			reject(err);
		});
	});
};

email.sendSetupEmail = function (email) {
	return new Promise(function (resolve, reject) {
		app.mailer.send('Setup', {
			to: email,
			subject: 'AutoConverter Setup!'
		}, function (err) {
			reject();
			if(err) {
				reject(err);
			}
			console.log('sent');
			resolve();

		});
	});
};


module.exports = email;
