'use strict';

class ConversionsService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Conversions/';
  }

  generateQueryString(query) {
    let queryString = '?';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        queryString += (key + '=' + query[key] + '&');
      }
    }
    return queryString.substring(0, queryString.length -1);
  }

  get(query) {
    let queryString = this.generateQueryString(query);
    return this.$http.get(this.urlBase + queryString);
  }

  count(query) {
    let queryString = this.generateQueryString(query);
    return this.$http.get(this.urlBase + 'count' + queryString);
  }

  create(newConverter) {
    return this.$http.post(this.urlBase, newConverter);
  }



}

ConversionsService.$inject = ['$http'];

export default ConversionsService;
