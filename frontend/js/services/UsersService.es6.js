'use strict';

class UsersService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Users/';
  }

  get() {
    return this.$http.get(this.urlBase);
  }



}

UsersService.$inject = ['$http'];

export default UsersService;
