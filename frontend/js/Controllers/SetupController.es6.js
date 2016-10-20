'use strict';

class SetupController {

    constructor(UsersService, ConfigService, ConvertersService, Notification) {
        this.UsersService = UsersService;
        this.ConfigService = ConfigService;
        this.ConvertersService = ConvertersService;
        this.Notification = this.Notification;

        this.sections = {

            user: {
                active: false,
                data: {
                    name: '',
                    email: '',
                    password: '',
                    confirm: '',
                },
                complete: false,
            },

            converter: {
                active: false,
                data: {
                    name: '',
                    path: ''
                },
                complete: false
            },

            config: {
                active: false,
                data: {
                    url: location.origin || '',
                    smtpHost: '',
                    smtpUsername: '',
                    smtpPassword: '',
                    smtpPort: null,
                    secureConnection: false,
                    fromAddress: '',
                    deployFolder: '',
                    convertedFoldersPath: '',
                    fallBackFoldersPath: ''
                },
                complete: false
            }
        };

        this.checkUsers();
        this.checkConverters();
        this.checkConfig();

        document.body.classList.add('loaded');
    }

    gotToActive() {

    }

    checkUsers() {
        this.UsersService.get()
            .then(data => {
                if (data.length) {
                    this.section.users.complete = true;
                }
            })
            .catch(this.handleErrors.bind(this))
            .finally(this.gotToActive.bind(this));
    }

    checkConverters() {
        this.ConvertersService.get()
            .then(data => {
                if (data.length) {
                    this.section.converters.complete = true;
                }
            })
            .catch(this.handleErrors.bind(this))
            .finally(this.gotToActive.bind(this));
    }

    checkConfig() {
        this.ConfigService.runTests()
            .then(data => {
                if (data.success) {
                    this.section.config.complete = true;
                }
            })
            .catch(this.handleErrors.bind(this))
            .finally(this.gotToActive.bind(this));
    }

    handleErrors(error) {
        console.error(error);
        this.Notification.error('Error communicating with server');
    }

}

SetupController.$inject = ['UsersService', 'ConfigService', 'ConvertersService', 'Notification'];

export default SetupController;
