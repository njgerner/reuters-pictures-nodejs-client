'use strict';

const expect = require('chai').expect;

const ReutersPicturesClient = require('../index');

const SearchService = require('../lib/search/ReutersPicturesSearchService');

describe('index.js', function() {
   
    describe('getSearchService', function() {
        
        it('Should return a search service instance', function() {
           
            const searchService = ReutersPicturesClient.getSearchService('username','password');
            expect(searchService).to.exist;
            expect(searchService).to.be.an.instanceof(SearchService);

        });
        
    })
    
});
