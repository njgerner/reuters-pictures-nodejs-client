'use strict';

const ReutersPicturesAuthenticationService = require('./ReutersPicturesAuthenticationService');

class ReutersPicturesAuthenticationServiceFactory {

    /**
     * @param {string} username
     * @param {string} password
     * @returns {ReutersPicturesAuthenticationService}
     */
    static create(username, password) {
        return new ReutersPicturesAuthenticationService(username, password);
    }

}

module.exports = ReutersPicturesAuthenticationServiceFactory;
