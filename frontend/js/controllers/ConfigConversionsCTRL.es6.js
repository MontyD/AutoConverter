'use strict';

class ConfigConversionsController {

    constructor(ConversionsService, Notification) {
      this.ConversionsService = ConversionsService;
      this.Notification = Notification;

      this.conversions = [];

      this.conversionsPerPage = 20;

      this.totalConversions = 0;

      this.currentPage = 0;

      this.ConversionsService.count({status: 'Uploaded'})
        .then(response => this.totalConversions = response.data)
        .catch(this.handleError.bind(this));

      this.ConversionsService.get({status: 'Uploaded', limit: this.conversionsPerPage})
        .then(response => this.conversions = response.data)
        .catch(this.handleError.bind(this));
    }

    changePage(number) {
      let offset = (number - 1) * this.conversionsPerPage;
      this.ConversionsService
        .get({status: 'Uploaded', offset: offset, limit: this.conversionsPerPage})
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

ConfigConversionsController.$inject = ['ConversionsService', 'Notification'];

export default ConfigConversionsController;
