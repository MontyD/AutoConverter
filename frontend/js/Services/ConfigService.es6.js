'use strict';

class ConfigService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Config/';
  }

  runTests() {
    return this.$http.get(this.urlBase + 'test');
  }

  create(config) {
    return this.$http.post(this.urlBase, config);
  }

}

ConfigService.$inject = ['$http'];

export default ConfigService;
