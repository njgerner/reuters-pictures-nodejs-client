'use strict';

const AuthFactory = require('./authentication/ReutersPicturesAuthenticationServiceFactory');
const SearchFactory = require('./search/ReutersPicturesSearchServiceFactory');

class ReutersPicturesServiceFactory {

    static getSearchService(username, password) {
        const authService = AuthFactory.create(username, password);
        const searchService = SearchFactory.create(authService);
        return searchService;
    }

}

module.exports = ReutersPicturesServiceFactory;
