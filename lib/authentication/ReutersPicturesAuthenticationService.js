'use strict';

const Promise = require('bluebird');
const Request = require('request-promise');
const Url = require('url');

const ReutersPicturesErrors = require('../errors/ReutersPicturesErrors');

class ReutersPicturesAuthenticationService {

    /**
     * @param {string} username
     * @param {string} password
     */
    constructor(username, password) {
        this._username = username;
        this._password = password;

        this._url = this._buildUrl();
    }

    /**
     * @returns {Promise.<string>}
     */
    getApiToken() {
        return this._sendRequest(this._url);
    }

    /**
     * @returns {string}
     * @private
     */
    _buildUrl() {
        const urlObject = {
            protocol: 'https:',
            slashes: true,
            host: 'api.pictures.reuters.com',
            pathname: '/API/Authentication/v1.0/Login',
            query: {
                Login: this._username,
                Password: this._password,
                Format: 'json'
            }
        };
        const url = Url.format(urlObject);
        return url;
    }

    /**
     * @param url
     * @private
     */
    _sendRequest(url) {
        return Promise.try(() => {
            const options = {
                uri: url,
                json: true
            };
            return Request(options)
            .then(response => response.APIResponse.Token)
            .catch(err => {
                throw new ReutersPicturesErrors.ReutersPicturesErrorAuthenticationService_AuthenticationFailedError(err.message);
            });
        })

    }

}

module.exports = ReutersPicturesAuthenticationService;
