'use strict';

function config($stateProvider, $urlRouterProvider, $locationProvider, dropzoneOpsProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('converter', {
			url: '/',
			abstract: true,
			template: require('../templates/sidebar.page.html'),
			controller: 'SidebarController',
			controllerAs: 'sidebar'
		})
		.state('converter.new', {
			url: '',
			template: require('../templates/NewConversion.page.html'),
			controller: 'NewConversionController',
			controllerAs: 'new'
		})
		.state('converter.config', {
			url: 'configure',
			template: require('../templates/ConfigConversions.page.html'),
			controller: 'ConfigConversionsController',
			controllerAs: 'config'
		})
		.state('converter.queue', {
			url: 'queue',
			template: require('../templates/ConversionsQueue.page.html'),
			controller: 'ConversionsQueueController',
			controllerAs: 'queue'
		})
		.state('converter.done', {
			url: 'done',
			template: require('../templates/ConversionsDone.page.html'),
			controller: 'ConversionsDoneController',
			controllerAs: 'done'
		});

	dropzoneOpsProvider.setOptions({
		acceptedFiles: '.ufx, .sfx, .png',
		createImageThumbnails: false,
		parallelUploads: 10,
    url: '/conversions/'
	});

}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'dropzoneOpsProvider'];

export default config;
