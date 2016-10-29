'use strict';

class SidebarController {

	constructor(Notification, SocketService, UsersService, ConversionsService, $scope) {
		this.Notification = Notification;
		this.SocketService = SocketService;
		this.UsersService = UsersService;
		this.ConversionsService = ConversionsService;
		this.scope = $scope;

		this.user = {
			id: null,
			username: '',
			isAdmin: false
		};

		this.configConversions = 0;

		this.queuedConversions = 0;

		this.UsersService.getInfo()
			.then(response => {
				this.user = {
					id: response.data.userId,
					isAdmin: response.data.isAdmin,
					username: response.data.username
				};
				this.SocketService.init(this.user.id);
				return true;
			})
			.catch(err => this.handleError.bind(this));

		this.ConversionsService.count({
				status: 'Uploaded'
			})
			.then(response => {
				this.configConversions = response.data;
			})
			.catch(err => this.handleError.bind(this));

		this.ConversionsService.count({
				status: 'allQueued'
			})
			.then(response => {
				this.queuedConversions = response.data;
			})
			.catch(err => this.handleError.bind(this));

		this.SocketService.on('newUploaded', data => {
			this.configConversions++;
			this.scope.$apply();
		}.bind(this));

		this.SocketService.on('deletedUploaded', data => {
			this.configConversions--;
			this.scope.$apply();
		}.bind(this));

		this.SocketService.on('deletedQueued', data => {
			this.queuedConversions--;
			this.scope.$apply();
		}.bind(this));

		this.SocketService.on('newQueuedConversion', data => {
			this.configConversions--;
			this.queuedConversions++;
			this.scope.$apply();
		}.bind(this));

		document.body.classList.add('loaded');
	}




	handleError(error) {
		if(error.status === 401 || error.status === 403) {
			window.location = '/users/login';
		}
		console.error(error);
		this.Notification.error('Error communicating with server');
	}



}

SidebarController.$inject = ['Notification', 'SocketService', 'UsersService', 'ConversionsService', '$scope'];

export default SidebarController;
