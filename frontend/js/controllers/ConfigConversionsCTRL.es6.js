'use strict';

class ConfigConversionsController {

	constructor(ConversionsService, ConvertersService, Notification) {
		this.ConversionsService = ConversionsService;
		this.Notification = Notification;
		this.ConvertersService = ConvertersService;

		this.conversions = [];

		this.conversionsPerPage = 10;

		this.totalConversions = 0;

		this.currentPage = 1;

		this.converters = {};

		this.ConversionsService.count({
				status: 'Uploaded'
			})
			.then(response => this.totalConversions = response.data)
			.catch(this.handleError.bind(this));

		this.ConversionsService.get({
				status: 'Uploaded',
				limit: this.conversionsPerPage
			})
			.then(response => this.conversions = response.data)
			.catch(this.handleError.bind(this));

		this.ConvertersService.get()
			.then(response => this.converters = response.data)
			.catch(this.handleError.bind(this));

	}

	convertForm(id, config) {
		return this.ConversionsService.convertForm(id, config)
			.then(response => {
				this.Notification.success(response.data.name + ' sent to convert.');
				this.changePage(this.currentPage);
			})
			.catch(this.handleError.bind(this));
	}

	deleteConversion(id) {

		this.ConversionsService.remove(id)
			.then(response => {
				this.Notification('Conversion Deleted');
				this.totalConversions--;
				this.changePage(this.currentPage);
			})
			.catch(this.handleError.bind(this));
	}

	changePage(number) {
		let offset = (number - 1) * this.conversionsPerPage;
		this.ConversionsService
			.get({
				status: 'Uploaded',
				offset: offset,
				limit: this.conversionsPerPage
			})
			.then(result => this.conversions = result.data)
			.catch(err => this.handleError.bind(this));
	}

	handleError(error) {
		if(error.status === 401 || error.status === 403) {
			window.location = '/users/login';
		}
		console.error(error);
		this.Notification.error('Error communicating with server');
	}



}

ConfigConversionsController.$inject = ['ConversionsService', 'ConvertersService', 'Notification'];

export default ConfigConversionsController;
