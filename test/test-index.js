'use strict';

const expect = require('chai').expect;

const ReutersPicturesClient = require('../index');

const AuthService = require('../lib/authentication/ReutersPicturesAuthenticationService');
const SearchService = require('../lib/search/ReutersPicturesSearchService');

describe('index.js', function() {

    describe('getAuthService', function() {

        it('Should return an auth service instance', function() {

            const authService = ReutersPicturesClient.getAuthService('username','password');
            expect(authService).to.exist;
            expect(authService).to.be.an.instanceof(AuthService);

        });

    });
   
    describe('getSearchService', function() {
        
        it('Should return a search service instance', function() {
           
            const searchService = ReutersPicturesClient.getSearchService('username','password');
            expect(searchService).to.exist;
            expect(searchService).to.be.an.instanceof(SearchService);

        });
        
    })
    
});
