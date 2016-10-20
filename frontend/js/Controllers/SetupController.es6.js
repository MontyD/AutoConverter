'use strict';

class SetupController {

  constructor(EmailService, ConfigService, ConvertersService) {
    this.EmailService = EmailService;
    this.ConfigService = ConfigService;
    this.ConvertersService = ConvertersService;
  }

}

SetupController.$inject = ['EmailService', 'ConfigService', 'ConvertersService'];

export default SetupController;
