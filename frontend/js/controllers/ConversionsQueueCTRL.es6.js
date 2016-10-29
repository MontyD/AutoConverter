'use strict';

class ConversionsQueueController {

	constructor(ConversionsService, UsersService, Notification) {
		this.ConversionsService = ConversionsService;
    this.Notification = Notification;
		this.UsersService = UsersService;

		this.conversions = [];

		this.conversionsPerPage = 20;

		this.totalConversions = 0;

		this.currentPage = 1;

		this.user = {};

		this.UsersService.getInfo()
			.then(response => {
				this.user = {
					id: response.data.userId,
					isAdmin: response.data.isAdmin,
				};
			})
			.catch(err => this.handleError.bind(this));

		this.ConversionsService.get({
				status: 'allQueued',
				limit: this.conversionsPerPage
			})
			.then(response => this.conversions = response.data)
			.catch(this.handleError.bind(this));

    this.ConversionsService.count({
				status: 'allQueued',
				limit: this.conversionsPerPage
			})
			.then(response => this.totalConversions = response.data)
			.catch(this.handleError.bind(this));
	}

	deleteConversion(id) {
		this.ConversionsService.remove(id)
			.then(response => {
				this.Notification('Conversion removed');
				this.changePage(this.currentPage);
			})
			.catch(this.handleError.bind(this));
	}


	changePage(number) {
		let offset = (number - 1) * this.conversionsPerPage;
		this.ConversionsService
			.get({
				status: 'allQueued',
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

ConversionsQueueController.$inject = ['ConversionsService', 'UsersService', 'Notification'];

export default ConversionsQueueController;
