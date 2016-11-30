'use strict';

const ReutersPicturesSearchServiceClientFactory = require('./ReutersPicturesSearchServiceClientFactory');
const ReutersPicturesErrors = require('../errors/ReutersPicturesErrors');

class ReutersPicturesSearchService {

    /**
     * @param {ReutersPicturesAuthenticationService} authService
     */
    constructor(authService) {
        this._authService = authService;

        /** {ReutersPicturesSearchServiceClient} */
        this._searchClient = null;
    }

    /**
     * @name ReutersPicturesSearchService_SearchOptions
     * @type {Object}
     * @property {Object} [query]
     * @property {string} [query.text]
     * @property {string} [query.keyword]
     * @property {string} [query.mediaType=Image] - Image, Album, Graphic
     * @property {object} [query.artist]
     * @property {string} query.artist.firstName
     * @property {string} query.artist.lastName
     * @property {string} [query.orientation] - Landscape, Portrait, Square
     * @property {string} [query.mediaNumber]
     * @property {String[]} [fields=['MediaNumber']] - see ReutersPicturesSearchService_ReturnObjectRecord for list of potential fields
     * @property {int} [pageNumber=1]
     * @property {int} [countPerPage=100]
     * @property {('Ranking'|'Newest'|'Oldest')} [sort='Ranking']
     */

    /**
     * @name ReutersPicturesSearchService_ReturnObject
     * @type {Object}
     * @property {int} totalCount
     * @property {int} queryDurationMs
     * @property {ReutersPicturesSearchService_ReturnObjectRecord[]} records
     */

    /**
     * @name ReutersPicturesSearchService_ReturnObjectRecord
     * @type {Object}
     * @property {string} [title]
     * @property {string} [systemIdentifier]
     * @property {string} [mediaNumber]
     * @property {string} [captionShort]
     * @property {string} [captionLong]
     * @property {string} [caption]
     * @property {string} [mediaDate]
     * @property {string} [mediaType]
     * @property {string} [artist]
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TRX] - Original high-resolution file. This format is protected and cannot be retrieved with the Search API. Please ask for the “Extract Original Document API” if you need access.
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TR1] - Large file (800*800px). Access to this format requires enhanced Security Profile
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TR1_COMP] - 800*600px; Unwatermarked
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TR3] - 728*728px; Watermarked
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TR3_UNWATERMARKED] - 728*728px; Unwatermarked
     * @property {ReutersPicturesSearchService_ReturnObjectRecord_Path} [Path_TR6] - 184*184px; Unwatermarked; Thumbnail
     */

    /**
     * @name ReutersPicturesSearchService_ReturnObjectRecord_Path
     * @type {Object}
     * @property {string} URI
     * @property {int} Width
     * @property {int} Height
     */

    /**
     * @param {ReutersPicturesSearchService_SearchOptions} options
     * @returns {Promise.<ReutersPicturesSearchService_ReturnObject>}
     */
    search(options) {

        let searchPromise;

        if (this._searchClient) {
            searchPromise = this.searchWithExistingClient(options);
        } else {
            searchPromise = this.authenticateNewSearchClientAndSearch(options);
        }

        return searchPromise
        .catch(ReutersPicturesErrors.ReutersPicturesSearchServiceClient_500Error, err => {
            return this.authenticateNewSearchClientAndSearch(options);
        })

    }
    
    /**
     * @param {ReutersPicturesSearchService_SearchOptions} options
     * @returns {Promise.<ReutersPicturesSearchService_ReturnObject>}
     */
    searchWithExistingClient(options) {
        return this._searchClient.search(options)
    }

    authenticateNewSearchClient() {
        return this._authService.getApiToken()
        .then(apiToken => ReutersPicturesSearchServiceClientFactory.create(apiToken))
        .then(searchClient => this._searchClient = searchClient);
    }

    /**
     * @param {ReutersPicturesSearchService_SearchOptions} options
     * @returns {Promise.<ReutersPicturesSearchService_ReturnObject>}
     */
    authenticateNewSearchClientAndSearch(options) {
        return this.authenticateNewSearchClient()
        .then(() => this.searchWithExistingClient(options));
    }
    
}

module.exports = ReutersPicturesSearchService;
