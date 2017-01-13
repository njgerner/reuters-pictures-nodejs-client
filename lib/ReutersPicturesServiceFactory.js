'use strict';

const AuthFactory = require('./authentication/ReutersPicturesAuthenticationServiceFactory');
const SearchFactory = require('./search/ReutersPicturesSearchServiceFactory');

class ReutersPicturesServiceFactory {

    static getAuthService(username, password) {
        return AuthFactory.create(username, password);
    }

    static getSearchService(username, password) {
        const authService = AuthFactory.create(username, password);
        return SearchFactory.create(authService);
    }

}

module.exports = ReutersPicturesServiceFactory;
