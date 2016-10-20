'use strict';

class ConfigService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Config';
  }



}

ConfigService.$inject = ['$http'];

export default ConfigService;
