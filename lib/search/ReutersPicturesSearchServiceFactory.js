'use strict';

const ReutersPicturesSearchService = require('./ReutersPicturesSearchService');

class ReutersPicturesSearchServiceFactory {

    /**
     * @param {ReutersPicturesAuthenticationService} authService
     * @returns {ReutersPicturesSearchService}
     */
    static create(authService) {
        return new ReutersPicturesSearchService(authService);
    }
    
}

module.exports = ReutersPicturesSearchServiceFactory;