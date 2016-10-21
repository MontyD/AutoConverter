import angular from 'angular';

import SetupController from './Controllers/SetupController.es6.js';

import UsersService from './Services/UsersService.es6.js';
import ConvertersService from './Services/ConvertersService.es6.js';
import ConfigService from './Services/ConfigService.es6.js';

import onSubmitAndDisable from './Directives/OnSubmitAndDisable.es6.js';
import usersForm from './Directives/UsersForm.es6.js';
import convertersForm from './Directives/ConvertersForm.es6.js';
import configForm from './Directives/ConfigForm.es6.js';

import uiNotification from 'angular-ui-notification';
import angularLoadingBar from 'angular-loading-bar';

angular.module('setup', ['ui-notification', 'angular-loading-bar'])
  .controller('SetupController', SetupController)
  .service('UsersService', UsersService)
  .service('ConvertersService', ConvertersService)
  .service('ConfigService', ConfigService)
  .directive('onSubmitAndDisable', onSubmitAndDisable)
  .directive('usersForm', usersForm)
  .directive('convertersForm', convertersForm)
  .directive('configForm', configForm);
