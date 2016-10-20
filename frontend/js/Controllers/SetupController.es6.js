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
                conplete: false,
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

        this.UsersService.get()
          .then(() => {

          })
          .catch(this.handleErrors.bind(this));

        document.body.classList.add('loaded');
    }

    handleErrors(error) {
      console.error(error);
      this.Notification.error('Error communicating with server');
    }

}

SetupController.$inject = ['UsersService', 'ConfigService', 'ConvertersService', 'Notification'];

export default SetupController;
