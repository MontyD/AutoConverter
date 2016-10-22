'use strict';

class ConvertersService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Converters/';
  }

  get() {
    return this.$http.get(this.urlBase);
  }

  create(newConverter) {
    return this.$http.post(this.urlBase, newConverter);
  }



}

ConvertersService.$inject = ['$http'];

export default ConvertersService;
