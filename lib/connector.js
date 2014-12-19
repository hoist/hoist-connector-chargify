'use strict';
var BBPromise = require('bluebird');
var requestPromise = require('request-promise');
var logger = require('hoist-logger');
var url = require('url');
var _ = require('lodash');
var errors = require('hoist-errors');

var baseUrl = '.chargify.com';


function ChargifyConnector(settings) {
  logger.info({
    settings: settings
  }, 'constructed chargify-connector');
  this.settings = settings;
}

ChargifyConnector.prototype.get = function (url, queryParams) {
  logger.info('inside hoist-connector-chargify.get');
  return this.request('GET', url, queryParams);
};

ChargifyConnector.prototype.post = function (url, data) {
  logger.info('inside hoist-connector-chargify.post');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in post');
  }
  return this.request('POST', url, null, data);
};

ChargifyConnector.prototype.put = function (url, data) {
  logger.info('inside hoist-connector-chargify.put');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in put');
  }
  return this.request('PUT', url, null, data);
};

ChargifyConnector.prototype.delete = function (url, queryParams, data) {
  logger.info('inside hoist-connector-chargify.delete');
  return this.request('DELETE', url, queryParams, data);
};

ChargifyConnector.prototype.request = function request(method, path, queryParams, data) {
  if(!path){
    throw new errors.connector.request.InvalidError('no path specified');
  }
  var username = this.settings.apiKey;
  var password = 'x';
  
  // path = path[path.length -1] === '/'? path.slice(0, -1) : path;
  var options = {
    uri: 'https://' + username + ':' + password + "@" + this.settings.subdomain + baseUrl + path,
    method: method,
    resolveWithFullResponse: true,
  };
  var parsedUrl = url.parse(options.uri, true);
  parsedUrl.search = null;

  if(queryParams) {
    parsedUrl.query = _.extend(parsedUrl.query, queryParams);
  }
  
  options.uri = url.format(parsedUrl);

  if(method === 'POST' || method === 'PUT') {
    if(typeof data === 'string'){
        options.contentType = 'application/xml';
    } else if (typeof data === 'object') {
      options.json = true;
    }
    options.body = data;
  }
  logger.info({
    method: method,
    path: path,
    options: options
  }, 'inside hoist-connector-chargify.request');
  return this.requestPromiseHelper(options)
    .then(function(response) {
      logger.info({
        response: response.body
      }, 'got response hoist-connector-chargify.request');
       return response.body;
    });
};
/* istanbul ignore next */
ChargifyConnector.prototype.requestPromiseHelper = function requestPromiseHelper (options) {
  return BBPromise.resolve(requestPromise(options));
};


module.exports = ChargifyConnector;
