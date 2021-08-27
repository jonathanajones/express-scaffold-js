// eslint-disable-next-line no-unused-vars
const should = require('should');
const nock = require('nock');
const defaultServiceCall = require('../serviceCalls/defaultServiceCall');

// save existing debug env var since we'll be changing it and we should reset it when done
const debug = process.env.DEBUG;
// turn on debug logging for nock so we can see everything as it happens
process.env.DEBUG = 'nock.*';

describe('defaultServiceCall', () => {
  let req;
  beforeEach(() => {
    nock.cleanAll();
    nock('http://localhost:3000').get('/foo').reply(200, { importantProperty: 'ok' }, { 'Content-Type': 'application/json' });

    req = {
      query: {
        param: 'bar',
      },
    };
  });
  after(() => {
    // restore debug env var
    process.env.DEBUG = debug;
  });

  it('should return correctly formatted data', async () => {
    const response = await defaultServiceCall(req);
    response.should.deepEqual({ importantProperty: 'ok' });
  });
});
