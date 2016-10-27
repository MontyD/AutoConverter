'use strict';

class ConfigConversionsController {

    constructor(ConversionsService, ConvertersService, Notification) {
        this.ConversionsService = ConversionsService;
        this.Notification = Notification;
        this.ConvertersService = ConvertersService;

        this.conversions = [];

        this.conversionsPerPage = 20;

        this.totalConversions = 0;

        this.currentPage = 0;

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

    deleteConversion(id) {

        this.ConversionsService.remove(id)
            .then(response => {
                this.Notification('Conversion Deleted');
                for (let i = 0; i < this.conversions.length; i++) {
                    if (this.conversions[i].id === id) {
                        this.conversions.splice(i, 1);
                        break;
                    }
                }
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
        if (error.status === 401 || error.status === 403) {
            window.location = '/users/login';
        }
        console.error(error);
        this.Notification.error('Error communicating with server');
    }



}

ConfigConversionsController.$inject = ['ConversionsService', 'ConvertersService', 'Notification'];

export default ConfigConversionsController;
