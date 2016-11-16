'use strict';

const ReutersPicturesClientError = require('./ReutersPicturesClientError');
const SearchResource = require('./resources/search/SearchResource');

class ReutersPicturesClient {
  
  /**
   * @param {Object} options
   * @param {String} options.apiToken
   */
  constructor (options) {
  
    if (!options || !options.apiToken) {
      throw new ReutersPicturesClientError({
        name: `ReutersPicturesClientError`,
        message: 'Missing required parameter "apiToken".'
      });
    }
  
    this._apiToken = options.apiToken;
    
    this.search = new SearchResource(options);
  }
}

module.exports = ReutersPicturesClient;