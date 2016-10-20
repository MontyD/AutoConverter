import angular from 'angular';

import SetupController from './Controllers/SetupController.es6.js';

import EmailService from './Services/EmailService.es6.js';
import ConvertersService from './Services/ConvertersService.es6.js';
import ConfigService from './Services/ConfigService.es6.js';

import onSubmitAndDisable from './Directives/OnSubmitAndDisable.es6.js';
import userForm from './Directives/UsersForm.es6.js';
import converterForm from './Directives/ConvertersForm.es6.js';
import configForm from './Directives/ConfigForm.es6.js';

import uiNotification from 'angular-ui-notification';

angular.module('setup', ['ui-notification'])
  .controller('SetupController', SetupController)
  .service('EmailService', EmailService)
  .service('ConvertersService', ConvertersService)
  .service('ConfigService', ConfigService)
  .directive('onSubmitAndDisable', onSubmitAndDisable)
  .directive('userForm', userForm)
  .directive('converterForm', converterForm)
  .directive('configForm', configForm);
