// should gets pulled into global namespace so it isn't used directly
// eslint-disable-next-line no-unused-vars
const should = require('should');
const proxyquire = require('proxyquire');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const stubs = require('./resource/stubs/defaultRouteStubs');

describe('default route', () => {
  let req;
  let res;
  let defaultRoute;
  beforeEach(async () => {
    // proxyquire to instance the server
    defaultRoute = await proxyquire('../routes/defaultRoute', stubs);
    req = httpMocks.createRequest({
      query: {
        param: 'bar',
      },
    });
    res = httpMocks.createResponse();
  });
  it('should show success response', async () => {
    const statusSpy = sinon.fake.returns(res);
    const sendSpy = sinon.fake();

    res.status = statusSpy;
    res.send = sendSpy;

    await defaultRoute(req, res);
    statusSpy.args[0][0].should.eql(200);
    sendSpy.args[0][0].should.eql({
      importantProperty: 'ok',
    });
  });

  it('should require querystring parameter "param"', async () => {
    const statusSpy = sinon.fake.returns(res);
    const sendSpy = sinon.fake();
    req = httpMocks.createRequest();

    res.status = statusSpy;
    res.send = sendSpy;

    await defaultRoute(req, res);
    statusSpy.args[0][0].should.eql(400);
    sendSpy.args[0][0].should.eql('"param" is required');
  });
});
