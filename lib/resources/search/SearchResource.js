'use strict';

const _ = require('lodash');
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
   * @name ReutersPicturesClient_SearchResourceOptions
   * @type {Object}
   * @property {Integer} page
   * @property {Integer} itemsPerPage
   */
  
  /**
   * @param {String} data
   * @param {ReutersPicturesClient_SearchResourceOptions} options
   * @return Promise
   */
  text (data, options) {
    options = options || {};
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
      query: {
        query: luceneQuery,
        page: options.page,
        itemsPerPage: options.itemsPerPage
      },
      url: this._baseUrl
    })
  }
  
  /**
   * @param {Array|String} data
   * @param {ReutersPicturesClient_SearchResourceOptions} options
   * @return Promise
   */
  keyword (data, options) {
    options = options || {};
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
      query: {
        query: luceneQuery,
        page: options.page,
        itemsPerPage: options.itemsPerPage
      },
      url: this._baseUrl
    })
  }
}

module.exports = SearchResource;