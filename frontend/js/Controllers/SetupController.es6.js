'use strict';

class SetupController {

    constructor(UsersService, ConfigService, ConvertersService, Notification) {
        this.UsersService = UsersService;
        this.ConfigService = ConfigService;
        this.ConvertersService = ConvertersService;
        this.Notification = Notification;

        this.sections = {

            user: {
                data: {
                    name: '',
                    email: '',
                    password: '',
                    confirm: '',
                },
                complete: false,
            },

            converter: {
                data: {
                    name: '',
                    path: ''
                },
                complete: false
            },

            config: {
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

        this.runTest(this.UsersService.get.bind(this.UsersService), 'length', this.sections.user);
        this.runTest(this.ConvertersService.get.bind(this.ConvertersService), 'length', this.sections.converter);
        this.runTest(this.ConfigService.runTests.bind(this.ConfigService), 'success', this.sections.config);

        document.body.classList.add('loaded');
    }

    getClassName(attribute) {
      if (this.sections[attribute].complete) {
        return 'complete';
      }
      for (let key in this.sections) {
        if (this.sections.hasOwnProperty(key)) {
          if (key === attribute && !this.sections[key].complete) {
            return 'active';
          } else if (!this.sections[key].complete) {
            return '';
          }
         }
      }
    }

    runTest(test, dataAttribute, elementToSetComplete) {
      test()
        .then(response => {
          if (response.data[dataAttribute]) {
            elementToSetComplete.complete = true;
          }
        })
        .catch(this.handleErrors.bind(this));
    }

    handleErrors(error) {
      this.Notification('Setup incomplete');
      return false;
    }

}

SetupController.$inject = ['UsersService', 'ConfigService', 'ConvertersService', 'Notification'];

export default SetupController;
