'use strict';

class ConvertersService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Converters';
  }



}

ConvertersService.$inject = ['$http'];

export default ConvertersService;
