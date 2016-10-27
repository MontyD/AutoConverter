'use strict';

class UsersService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Users/';
  }

  get() {
    return this.$http.get(this.urlBase);
  }

  getInfo() {
    return this.$http.get(this.urlBase + 'info');
  }

  create(newUser) {
    return this.$http.post(this.urlBase, newUser);
  }



}

UsersService.$inject = ['$http'];

export default UsersService;
