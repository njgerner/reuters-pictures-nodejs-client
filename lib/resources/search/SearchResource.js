'use strict';

const Generator = require('lucene-query-generator');
const Resource = require('../Resource');
const ReutersPicturesClientError = require('../../ReutersPicturesClientError');

class SearchResource extends Resource {
  
  constructor (options = {}) {
    super(options);
    this._resourceName = 'Search';
    this._baseUrl = '/search'
  }
  
  /**
   * @param {String} data
   * @return Promise
   */
  text (data) {
    if (typeof data !== 'string') {
      throw new ReutersPicturesClientError({
        name: `ReutersPicturesClientSearchError`,
        message: 'ReutersPicturesClient.search.text requires a string input.'
      })
    }
    
    const luceneQuery = Generator.convert({
      $operands: [{ name: data }]
    });
    
    return this._makeRequest({
      method: 'GET',
      query: { query: luceneQuery },
      url: this._baseUrl
    })
  }
  
  /**
   * @param {Array|String} data
   * @return Promise
   */
  keyword (data) {
    if (typeof data == 'string') data = [data];
    if (!Array.isArray(data)) {
      throw new ReutersPicturesClientError({
        name: `ReutersPicturesClientSearchError`,
        message: 'ReutersPicturesClient.search.keyword requires a string or array input.'
      })
    }
    
    const luceneQuery = Generator.convert({
      $operands: [{ keyword: data }]
    });
    
    return this._makeRequest({
      method: 'GET',
      query: { query: luceneQuery },
      url: this._baseUrl
    })
  }
}

module.exports = SearchResource;