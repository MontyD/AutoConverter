'use strict';

function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/new');

    $stateProvider
        .state('converter', {
            url: '/',
            template: require('../templates/sidebar.page.html'),
            controller: 'SidebarController',
            controllerAs: 'sidebar'
        })
        .state('converter.new', {
            url: '/new',
            template: require('../templates/NewConversion.page.html'),
            controller: 'NewConversionController',
            controllerAs: 'new'
        })
        .state('converter.config', {
            url: '/configure',
            template: require('../templates/ConfigConversions.page.html'),
            controller: 'ConfigConversionsController',
            controllerAs: 'config'
        })
        .state('converter.queue', {
          url: '/queue',
          template: require('../templates/ConversionsQueue.page.html'),
          controller: 'ConversionsQueueController',
          controllerAs: 'queue'
        })
        .state('converter.done', {
          url: '/done',
          template: require('../templates/ConversionsDone.page.html'),
          controller: 'ConversionsDoneController',
          controllerAs: 'done'
        });

}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default config;
