'use strict';

class ConfigService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Config/';
  }

  runTests() {
    return this.$http.get(this.urlBase + 'test');
  }

}

ConfigService.$inject = ['$http'];

export default ConfigService;
