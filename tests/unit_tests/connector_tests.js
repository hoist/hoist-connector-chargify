'use strict';
require('../bootstrap');
var Chargify = require('../../lib/connector');
var sinon = require('sinon');
var BBPromise = require('bluebird');
var expect = require('chai').expect;
var requestPromise = require('request-promise');
var config = require('config');
var errors = require('hoist-errors');

describe('ChargifyConnector', function () {
  var connector;
  before(function () {
    connector = new Chargify({
      apiKey: '1234567890',
      subdomain: 'test-domain'
    });
  });
  describe('#get', function () {
    describe('with no queryParams', function () {
      var response = {};
      var result;
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.get('/job.api');
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('GET', '/job.api', undefined);
      });
    });
    describe('with queryParams', function () {
      var response = {};
      var result;
      var queryParams = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.get('/job.api', queryParams);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('GET', '/job.api', queryParams);
      });
    });
  });
  describe('#post', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.post('/path');
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
    describe('with data', function () {
      var response = {};
      var result;
      var data = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.post('/coupons.json', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('POST', '/coupons.json', null, data);
      });
    });
  });
  describe('#put', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.put('/path');
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
    describe('with data', function () {
      var response = {};
      var result;
      var data = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.put('client.api/update', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('PUT', 'client.api/update', null, data);
      });
    });
  });
  describe('#delete', function () {
    var response = {};
    var result;
    before(function () {
      sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
      result = connector.delete('/job.api');
    });
    after(function () {
      connector.request.restore();
    });
    it('calls #request', function () {
      expect(connector.request)
        .to.have.been.calledWith('DELETE', '/job.api', undefined, undefined);
    });
  });
  describe('#request', function () {
    describe('GET', function () {
      describe('with no queryParams', function () {
        var response = {
          body: 'body'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupon/2'
        }
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/coupon/2');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });

      describe('with queryParams object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupon/2?query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/coupon/2', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });

      describe('with queryParams in path', function () {
        var response = {
          body: 'body'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupon/2?query=query'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/coupon/2?query=query');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });

      describe('with queryParams in path and object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupon/2?querypath=querypath&query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/coupon/2?querypath=querypath', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
      describe('with duplicate queryParams in path and object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupon/2?query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/coupon/2?query=queryfalse', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper correctly', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
    });
    describe('POST', function () {
      describe('with xml string', function () {
        var response = {
          body: 'body'
        };
        var data = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupons.json',
          body: data,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('POST', '/coupons.json', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var options = {
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupons.json',
          body: '{"Staff":{"Name":"John"}}',
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('POST', '/coupons.json', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
    });
    describe('PUT', function () {
      describe('with xml string', function () {
        var response = {
          body: 'body'
        };
        var data = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'PUT',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupons.json',
          body: data,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('PUT', '/coupons.json', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var options = {
          method: 'PUT',
          resolveWithFullResponse: true,
          uri: 'https://1234567890:x@test-domain.chargify.com/coupons.json',
          body: '{"Staff":{"Name":"John"}}',
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('PUT', '/coupons.json', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
    });
    describe('with no path', function () {
      it('rejects', function () {
        expect(function () {
          connector.request();
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
  });
});
