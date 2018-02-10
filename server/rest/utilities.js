/*Utilities for rest services*/

Utility = {
  getRequestContents: function(request) {
    switch (request.method) {
      case 'GET':
        return _.omit(request.query, '__proto__');
      case 'POST':
        return _.omit(request.body, '__proto__');
      case 'PUT':
        return _.omit(request.body, '__proto__');
      case 'DELETE':
        return _.omit(request.body, '__proto__');
    }
  },
  hasData: function(data) {
    return Object.keys(data).length > 0 ? true : false;
  },
  response: function(context, statusCode, data) {
    statusCode = statusCode;
    // ----------------------------------------------------
    context.response.setHeader('Content-Type', 'application/json');
    context.response.statusCode = statusCode;
    context.response.end(JSON.stringify(data));
  },
  validate: function(data, pattern) {
    return Match.test(data, pattern);
  },
};
