import angular from 'angular';
import uiRouter from 'angular-ui-router';
import io from 'socket.io-client';
window.io = io;

import SetupController from './Controllers/SetupController.es6.js';
import SidebarController from './Controllers/SidebarCTRL.es6.js';
import NewConversionController from './Controllers/NewConversionCTRL.es6.js';
import ConfigConversionsController from './Controllers/ConfigConversionsCTRL.es6.js';
import ConversionsQueueController from './Controllers/ConversionsQueueCTRL.es6.js';
import ConversionsDoneController from './Controllers/ConversionsDoneCTRL.es6.js';


import UsersService from './Services/UsersService.es6.js';
import ConvertersService from './Services/ConvertersService.es6.js';
import ConfigService from './Services/ConfigService.es6.js';

import onSubmitAndDisable from './Directives/OnSubmitAndDisable.es6.js';

import uiNotification from 'angular-ui-notification';
import angularLoadingBar from 'angular-loading-bar';
import dirPagination from 'angular-utils-pagination';

import converterConfig from './config/converterConfig.es6.js';

angular.module('converter', [uiRouter, 'ui-notification', 'angular-loading-bar'])
  .controller('SidebarController', SidebarController)
  .controller('NewConversionController', NewConversionController)
  .controller('ConfigConversionsController', ConfigConversionsController)
  .controller('ConversionsQueueController', ConversionsQueueController)
  .controller('ConversionsDoneController', ConversionsDoneController)
  .service('UsersService', UsersService)
  .service('ConvertersService', ConvertersService)
  .service('ConfigService', ConfigService)
  .directive('onSubmitAndDisable', onSubmitAndDisable)
  .config(converterConfig);
