'use strict';

class ConversionsService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Conversions/';
  }

  get(query) {
    let queryString = '?';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        queryString += (key + '=' + query[key] + '&');
      }
    }
    queryString = queryString.substring(0, queryString.length -1);
    return this.$http.get(this.urlBase + queryString);
  }

  create(newConverter) {
    return this.$http.post(this.urlBase, newConverter);
  }



}

ConversionsService.$inject = ['$http'];

export default ConversionsService;
