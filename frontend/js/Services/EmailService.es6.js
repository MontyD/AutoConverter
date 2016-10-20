'use strict';

class EmailService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Config/Emails';
  }



}

EmailService.$inject = ['$http'];

export default EmailService;
