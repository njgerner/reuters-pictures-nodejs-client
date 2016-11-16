const Promise = require('bluebird');
const Request = require('request-promise');
const _ = require('lodash');

const ReutersPicturesClientError = require('../ReutersPicturesClientError');

class Resource {
  
  /**
   * @param {Object} options
   * @param {String} options.apiToken
   */
  constructor (options) {
    if (!options || !options.apiToken) {
      throw new ReutersPicturesClientError({
        name: `ReutersPicturesClientError${this._resourceName}ResourceError`,
        message: 'Missing required parameter "apiToken".'
      });
    }
    
    this._apiToken = options.apiToken;
  }
  
  /**
   * @name ReutersPicturesClient_RequestConfig
   * @type {Object}
   * @property {Object} data
   * @property {'GET'|'PUT'|'POST'|'DELETE'|'PATCH'} method
   * @property {String} query
   * @property {Object} params
   * @property {String} url
   */
  
  /**
   * @param {ReutersPicturesClient_RequestConfig} requestConfig
   * @return {Promise}
   */
  _makeRequest (requestConfig) {
    return Request({
      baseUrl: 'http://pictures.reuters.com/API/search/v1.0',
      body: requestConfig.data || {},
      headers: this._buildHeaders(),
      method: requestConfig.method,
      qs: requestConfig.query || {},
      timeout: 30000,
      uri: this._buildUrl(requestConfig),
      json: true
    })
    .catch(res => {
      throw new ReutersPicturesClientError({
        message: res.response.statusCode == 401 ? 'ReutersPicturesClientResourceError unauthorized api token provided.' : res.error.message,
        type: `ReutersPicturesClientResourceError`
      });
    })
  }
  
  /**
   * @return {Object}
   * @private
   */
  _buildHeaders() {
    return {
      'Authorization': `Basic ${this._apiToken}`,
      "User-Agent": 'ReutersPicturesNodejsClient/v1',
      'Accept': 'application/json'
    }
  }
  
  /**
   * @param {ReutersPicturesClient_RequestConfig} requestConfig
   * @return {String} url
   * @private
   */
  _buildUrl(requestConfig) {
    let url = requestConfig.url;
    _.mapKeys(requestConfig.params, (value, key) => {
      url = url.replace(`{${key}}`, value)
    });
    return url;
  }
  
}

module.exports = Resource;