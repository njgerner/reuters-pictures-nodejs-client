'use strict';

const Promise = require('bluebird');
const expect = require('chai').expect;

const ReutersPicturesErrors = require('../lib/errors/ReutersPicturesErrors');
const ReutersPicturesSearchServiceClientFactory = require('../lib/search/ReutersPicturesSearchServiceClientFactory');
const searchClient = ReutersPicturesSearchServiceClientFactory.create('apitoken');

describe('ReutersPicturesSearchServiceClient', function() {

    describe('_buildUrl', function() {

        it('Should work when no options are provided', function() {
            const url = searchClient._buildUrl();
            expect(url).to.equal('https://api.pictures.reuters.com/API/search/v3.0/search?token=apitoken&query=%20MediaType%3AImage&fields=MediaNumber&format=json');
        });

        it('Should work when all parameters provided', function() {
            const url = searchClient._buildUrl({
                query: {
                    text: 'snowy mountain',
                    keyword: 'mountain',
                    mediaType: 'Image',
                    artist: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    orientation: 'Landscape'
                },
                fields: 'MediaNumber',
                pageNumber: 2,
                sort: 'Newest'
            });

            expect(url).to.equal('https://api.pictures.reuters.com/API/search/v3.0/search?token=apitoken&query=%20text%3Asnowy%20mountain%20keyword%3Amountain%20MediaType%3AImage%20Artist%3AJohn%20Doe%20Orientation%3ALandscape&fields=MediaNumber&pagenumber=2&sort=Newest&format=json');
        });

        it('Should throw an error when URL is too long', function() {
            let err;
            try {
                const url = searchClient._buildUrl({
                    query: {
                        text: 'snowy mountain',
                        keyword: 'mountain',
                        mediaType: 'Image',
                        artist: {
                            firstName: 'John',
                            lastName: 'Doe'
                        },
                        orientation: 'Landscape'
                    },
                    fields: 'MediaNumber,Path_TR3,Artist,CaptionLong',
                    pageNumber: 2,
                    countPerPage: 10,
                    sort: 'Newest'
                });
            } catch (_err) {
                err = _err;
            }
            
            expect(err).to.exist;
            expect(err).to.be.an.instanceof(ReutersPicturesErrors.ReutersPicturesSearchServiceClient_UrlTooLongError);
        });

    });

});