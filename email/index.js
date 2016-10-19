'use strict';

const app = require('express')(),
    mailer = require('express-mailer'),
    path = require('path'),
    models = require(path.resolve(__dirname, '..', 'models'));


var fromAddress = 'autoconverter@victoriaforms.com';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const email = {};

email.testSMTPSettings = function(config) {
    fromAddress = config.fromAddress;
    let smtpSettings = {
        from: fromAddress,
        host: config.smtpHost,
        port: config.smtpPort,
        secureConnection: config.secureConnection,
        auth: {
            user: config.smtpUsername || undefined,
            pass: config.smtpPassword || undefined,
        }
    };
    return new Promise(function(resolve, reject) {
        mailer.extend(app, smtpSettings);
        models.users.findOne({
            where: {
                isAdmin: true
            }
        }).then(function(admin) {
            if (!admin) {
                reject({
                    message: 'Admin user must be signed up to test email settings'
                });
            }
            return email.sendSetupEmail(admin.email).then(resolve).catch(reject);
        }).catch(function(err) {
            reject(err);
        });
    });
};

email.setSMTPSettings = function() {
    return new Promise(function(resolve, reject) {
        models.config.findAll().then(function(configs) {
            return email.testSMTPSettings(configs[0]).then(resolve).catch(reject);
        }).catch(reject);
    });
};

email.sendSetupEmail = function(email) {
    return new Promise(function(resolve, reject) {
        app.mailer.send('Setup', {
            to: email,
            subject: 'AutoConverter Setup!'
        }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


module.exports = email;
