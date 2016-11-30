'use strict';

const expect = require('chai').expect;

const credentials = require('./credentials/credentials.json');

const authFactory = require('../lib/authentication/ReutersPicturesAuthenticationServiceFactory');
const authService = authFactory.create(credentials.username, credentials.password);

const searchFactory = require('../lib/search/ReutersPicturesSearchServiceFactory');
const searchService = searchFactory.create(authService);

describe('ReutersPicturesSearchService', function() {

    this.timeout(10000);

    describe('search', function() {

        it('Should successfully search for a text string', function() {
            return searchService.search({
                query: { text: 'mountain' }
            })
            .then(results => {
                expect(results).to.exist;
                expect(results.totalCount).to.be.greaterThan(1000);
                expect(results.queryDurationMs).to.be.greaterThan(0);
                expect(results.records).to.be.an.array;
                expect(results.records.length).to.equal(100);

                results.records.forEach(record => {
                    expect(record.mediaNumber).to.be.a.string;
                })
            })
        });

        it('Should successfully allow pagination and additional fields', function() {
            return searchService.search({
                query: { keyword: 'fire' },
                fields: 'Title,MediaNumber,Path_TR3,CaptionShort',
                pageNumber: 2,
                countPerPage: 10
            })
            .then(results => {
                expect(results).to.exist;
                expect(results.totalCount).to.be.greaterThan(1000);
                expect(results.queryDurationMs).to.be.greaterThan(0);
                expect(results.records).to.be.an.array;
                expect(results.records.length).to.equal(10);

                results.records.forEach(record => {
                    expect(record.captionShort).to.be.a.string;
                    expect(record.mediaNumber).to.be.a.string;
                    expect(record.path_TR3).to.be.an.object;
                    expect(record.path_TR3.Height).to.be.a.number;
                    expect(record.path_TR3.Width).to.be.a.number;
                    expect(record.path_TR3.URI).to.be.a.URI;
                })
            })
        });

        // Provides an easy way to test arbitrary queries - just uncomment and modify the search query
        /*
        it('Just testing the search service', function() {
            return searchService.search({
                query: { text: 'mountain' }
            })
            .then(results => {
                console.log(results);
            })
        })
        */

    });

});
