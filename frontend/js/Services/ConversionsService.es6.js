'use strict';

class ConversionsService {

  constructor($http) {
    this.$http = $http;
    this.urlBase = '/Conversions/';
  }

  _generateQueryString(query) {
    let queryString = '?';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        queryString += (key + '=' + query[key] + '&');
      }
    }
    return queryString.substring(0, queryString.length -1);
  }

  get(query) {
    let queryString = this._generateQueryString(query);
    return this.$http.get(this.urlBase + queryString);
  }

  count(query) {
    let queryString = this._generateQueryString(query);
    return this.$http.get(this.urlBase + 'count' + queryString);
  }

  create(newConverter) {
    return this.$http.post(this.urlBase, newConverter);
  }

  remove(id) {
    return this.$http.delete(this.urlBase + id);
  }

  convertForm(id, config) {
    return this.$http.post(this.urlBase + 'convert/' + id, config);
  }



}

ConversionsService.$inject = ['$http'];

export default ConversionsService;
