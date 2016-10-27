import angular from 'angular';
import uiRouter from 'angular-ui-router';
import io from 'socket.io-client';
import dropzone from 'dropzone';

// External dependencies expected to be global by ng
window.io = io;
window.Dropzone = dropzone;
window.Dropzone.autoDiscover = false;


import SetupController from './Controllers/SetupController.es6.js';
import SidebarController from './Controllers/SidebarCTRL.es6.js';
import NewConversionController from './Controllers/NewConversionCTRL.es6.js';
import ConfigConversionsController from './Controllers/ConfigConversionsCTRL.es6.js';
import ConversionsQueueController from './Controllers/ConversionsQueueCTRL.es6.js';
import ConversionsDoneController from './Controllers/ConversionsDoneCTRL.es6.js';


import UsersService from './Services/UsersService.es6.js';
import ConvertersService from './Services/ConvertersService.es6.js';
import ConfigService from './Services/ConfigService.es6.js';
import SocketService from './Services/SocketService.es6.js';
import ConversionsService from './Services/ConversionsService.es6.js';

import onSubmitAndDisable from './Directives/OnSubmitAndDisable.es6.js';
import conversionForm from './Directives/ConversionForm.es6.js';

import uiNotification from 'angular-ui-notification';
import angularLoadingBar from 'angular-loading-bar';
import dirPagination from 'angular-utils-pagination';
import ngDropzone from 'ngDropzone';

import converterConfig from './config/converterConfig.es6.js';

angular.module('converter', [uiRouter, 'ui-notification', 'angular-loading-bar', 'thatisuday.dropzone', 'angularUtils.directives.dirPagination'])
  .controller('SidebarController', SidebarController)
  .controller('NewConversionController', NewConversionController)
  .controller('ConfigConversionsController', ConfigConversionsController)
  .controller('ConversionsQueueController', ConversionsQueueController)
  .controller('ConversionsDoneController', ConversionsDoneController)
  .service('SocketService', SocketService)
  .service('UsersService', UsersService)
  .service('ConvertersService', ConvertersService)
  .service('ConfigService', ConfigService)
  .service('ConversionsService', ConversionsService)
  .directive('onSubmitAndDisable', onSubmitAndDisable)
  .directive('conversionForm', conversionForm)
  .config(converterConfig);
