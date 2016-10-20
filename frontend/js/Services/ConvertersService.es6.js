'use strict';

class ConvertersService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Converters/';
  }

  get() {
    return this.$http.get(this.urlBase);
  }



}

ConvertersService.$inject = ['$http'];

export default ConvertersService;
