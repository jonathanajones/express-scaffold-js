const should = require('should');
const proxyquire = require('proxyquire');
const stubs = require('./resource/stubs/defaultServiceStubs');

describe('Default Service', () => {
  let defaultService;
  let req;
  beforeEach(async () => {
    defaultService = await proxyquire('../services/defaultService', stubs);
    req = {
      query: {
        param: 'bar',
      },
    };
  });

  it('should return a correctly formated response', async () => {
    const response = await defaultService.getDefaultData(req);
    response.should.deepEqual({
      importantProperty: 'ok',
    });
  });

  it('should give error with bad query parameter', async () => {
    req = {
      query: {
        param: 'foo',
      },
    };
    try {
      // this will throw an error from the serviceCall
      // so we need to try/catch and examine the error for our tests
      await defaultService.getDefaultData(req);
    } catch (error) {
      // should doesn't extend error objects so we need to use should(error) syntax
      // instead of the usual thing.should.something.something
      should(error.message).deepEqual(JSON.stringify({ statusCode: 400, message: 'Error from service call: {"statusCode":404,"message":"No FOOling around"}' }));
    }
  });
});
