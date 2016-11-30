'use strict';

const ReutersPicturesSearchServiceClient = require('./ReutersPicturesSearchServiceClient');

class ReutersPicturesSearchServiceClientFactory {

    /**
     * @param {string} apiToken
     * @returns {ReutersPicturesSearchServiceClient}
     */
    static create(apiToken) {
        return new ReutersPicturesSearchServiceClient(apiToken);
    }

}

module.exports = ReutersPicturesSearchServiceClientFactory;
