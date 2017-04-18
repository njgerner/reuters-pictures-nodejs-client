'use strict';

const Promise = require('bluebird');
const Url = require('url');
const ReutersPicturesErrors = require('../errors/ReutersPicturesErrors');
const Request = require('request-promise');

class ReutersPicturesSearchServiceClient {

    /**
     * @param {string} apiToken
     */
    constructor(apiToken) {
        this._apiToken = apiToken;
    }


    /**
     * @param {ReutersPicturesSearchService_SearchOptions} options
     * @returns {Promise.<ReutersPicturesSearchService_ReturnObject>}
     */
    search(options) {
        return Promise.try(() => this._buildUrl(options))
        .then(url => this._getSearchResults(url));
    }

    /**
     * @param {ReutersPicturesSearchService_SearchOptions} options
     * @returns {string}
     * @private
     */
    _buildUrl(options) {
        options = options || {};
        const urlObject = {
            protocol: 'https:',
            slashes: true,
            host: 'api.pictures.reuters.com',
            pathname: '/API/search/v3.0/search',
            query: {
                token: this._apiToken
            }
        };

        if (!options.query) {
            options.query = {
                mediaType: 'Image'
            }
        }
        
        // 1) Set the query parameter
        let queryString = '';
        if (options.query.text) {
            queryString += ` text:${options.query.text}`;
        }
        if (options.query.keyword) {
            queryString += ` keyword:${options.query.keyword}`;
        }
        if (options.query.mediaType) {
            queryString += ` MediaType:${options.query.mediaType}`;
        }
        if (options.query.artist) {
            queryString += ` Artist:${options.query.artist.firstName} ${options.query.artist.lastName}`;
        }
        if (options.query.orientation) {
            queryString += ` Orientation:${options.query.orientation}`;
        }
        if (options.query.mediaNumber) {
            queryString += ` MediaNumber:${options.query.mediaNumber}`;
        }
        urlObject.query.query = queryString;

        // 2) Set the other "meta" parameters
        urlObject.query.fields = options.fields || 'MediaNumber';

        if (options.pageNumber) {
            urlObject.query.pagenumber = options.pageNumber;
        }

        if (options.countPerPage) {
            urlObject.query.countperpage = options.countPerPage;
        }

        if (options.sort) {
            urlObject.query.sort = options.sort;
        }

        urlObject.query.format = 'json';

        const url = Url.format(urlObject);
        
        if (url.length > 280) {
            throw new ReutersPicturesErrors.ReutersPicturesSearchServiceClient_UrlTooLongError(url);
        }
        
        return url;
    }

    /**
     * @param {string} url
     * @private
     */
    _getSearchResults(url) {
        return Promise.try(() => {
            const options = {
                uri: url,
                json: true
            };

            return Request(options)
            .then(response => this._createResultsFromResponse(response))
            .catch(err => {
                throw new ReutersPicturesErrors.ReutersPicturesSearchServiceClient_500Error(err.message);
            });
        })
    }

    /**
     * @param {Object} response
     * @returns {ReutersPicturesSearchService_ReturnObject}
     * @private
     */
    _createResultsFromResponse(response) {
        const returnObj = {
            totalCount: response.APIResponse.GlobalInfo.TotalCount,
            queryDurationMs: response.APIResponse.GlobalInfo.QueryDurationMilliseconds
        };

        const records = (response.APIResponse.Items || []).map(item => this._createResultsRecord(item));

        returnObj.records = records;

        return returnObj;
    }

    /**
     * @param {Object} responseRecord
     * @returns {ReutersPicturesSearchService_ReturnObjectRecord}
     * @private
     */
    _createResultsRecord(responseRecord) {
        const record = {};

        Object.keys(responseRecord).forEach(key => {
            const recordKey = key.charAt(0).toLowerCase() + key.slice(1);
            record[recordKey] = responseRecord[key];
        });

        return record;
    }

}

module.exports = ReutersPicturesSearchServiceClient;