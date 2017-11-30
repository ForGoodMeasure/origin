/* eslint-disable no-var */
var app = require('./dist/server/server-bundle');

exports.handler = function (event, context) {
  app.awsServerlessProxy(event, context)
};
