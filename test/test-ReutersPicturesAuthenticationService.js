'use strict';

const expect = require('chai').expect;

const credentials = require('./credentials/credentials.json');

const factory = require('../lib/authentication/ReutersPicturesAuthenticationServiceFactory');
const service = factory.create(credentials.username, credentials.password);

describe('ReutersPicturesAuthenticationService', function() {

    describe('getApiToken', function() {

        it('Should work', function() {
            return service.getApiToken()
            .then(apiToken => {
                expect(apiToken).to.exist;
                expect(apiToken).to.be.a.string;
                expect(apiToken.length).to.equal(50);
            });
        });

    });

});
