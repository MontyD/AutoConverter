'use strict';

class ConversionsQueueController {

    constructor(ConversionsService) {
      this.ConversionsService = ConversionsService;

      this.conversions = [];

      this.conversionsPageLimit = 20;

      this.ConversionsService.get({status: 'Uploaded', limit: this.conversionsPageLimit})
        .then(response => this.conversions = response.data)
        .catch(this.handleError.bind(this));

    }


    handleError(error) {
      if(error.status === 401 || error.status === 403) {
        window.location = '/users/login';
      }
      console.error(error);
      this.Notification.error('Error communicating with server');
    }



}

ConversionsQueueController.$inject = ['ConversionsService'];

export default ConversionsQueueController;
