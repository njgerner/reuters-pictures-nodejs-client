const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;

const ReutersPicturesClient = require('../index');
const ReutersPicturesClientError = require('../lib/ReutersPicturesClientError');

const testApiKeyToken = '-- NO TEST TOKEN YET --';

describe('ReutersPicturesClient', () => {
  
  describe('constructor', () => {
    
    it('should throw an error if the client is instantiated without api token', () => {
      return Promise.resolve()
      .then(() => new ReutersPicturesClient())
      .catch(err => expect(err).to.exist);
    });
    
    it('should instantiate the client', () => {
      return Promise.resolve()
      .then(() => new ReutersPicturesClient({ apiToken: testApiKeyToken }))
      .then(result => expect(result).to.be.an.instanceOf(ReutersPicturesClient))
    });
    
  });
  
  describe('Authorization Error Handling', () => {
    
    it('should properly catch a 401 html response', () => {
      const ReutersPictures = new ReutersPicturesClient({ apiToken: 'fakeToken' });
  
      return ReutersPictures.search.text('pandas')
      .then(result => expect(result).to.not.exist)
      .catch(err => {
        expect(err).to.exist;
        expect(err).to.be.an.instanceOf(ReutersPicturesClientError);
        expect(err.message).to.be.equal('ReutersPicturesClientResourceError unauthorized api token provided.');
      })
    });
    
  });
  
  describe('Resources', () => {
    
    describe('Search', () => {
      
      describe('text', () => {
  
        it('should return an error if the input is not a string', () => {
          const ReutersPictures = new ReutersPicturesClient({ apiToken: testApiKeyToken });
          return Promise.resolve()
          .then(() => ReutersPictures.search.text(['pandas']))
          .then(result => expect(result).to.not.exist)
          .catch(err => {
            expect(err).to.exist;
            expect(err).to.be.an.instanceOf(ReutersPicturesClientError);
            expect(err.message).to.be.equal('ReutersPicturesClient.search.text requires a string input.');
          })
        });
        
        it('should search by text', () => {
          const ReutersPictures = new ReutersPicturesClient({ apiToken: testApiKeyToken });
          
          return ReutersPictures.search.text('pandas')
          .then(result => {
            expect(result).to.exist;
          })
        });
      });
      
      describe('keyword', () => {
        
        it('should return an error if the input is not a string or array', () => {
          const ReutersPictures = new ReutersPicturesClient({ apiToken: testApiKeyToken });
          return Promise.resolve()
          .then(() => ReutersPictures.search.keyword({ 'bad': 'input' }))
          .then(result => expect(result).to.not.exist)
          .catch(err => {
            expect(err).to.exist;
            expect(err).to.be.an.instanceOf(ReutersPicturesClientError);
            expect(err.message).to.be.equal('ReutersPicturesClient.search.keyword requires a string or array input.');
          })
        });
        
        it('should search by keyword', () => {
          const ReutersPictures = new ReutersPicturesClient({ apiToken: testApiKeyToken });
  
          return ReutersPictures.search.keyword('pandas')
          .then(result => {
            expect(result).to.exist;
          })
        });
  
        it('should search by multiple keywords', () => {
          const ReutersPictures = new ReutersPicturesClient({ apiToken: testApiKeyToken });
    
          return ReutersPictures.search.keyword(['pandas', 'bears'])
          .then(result => {
            expect(result).to.exist;
          })
        });
      });
    });
  })
});