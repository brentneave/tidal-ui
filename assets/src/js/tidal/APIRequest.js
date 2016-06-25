var request = require('request'),
    Broadcaster = require('../events/Broadcaster');


function APIRequest(url, headers, form) {

  var _onResponse = new Broadcaster(this),
      _onError = new Broadcaster(this),
      _url = url,
      _headers = headers,
      _form = form;

  Object.defineProperty(this, 'onResponse', {
    get: function() { return _onResponse; }
  });

  Object.defineProperty(this, 'onError', {
    get: function() { return _onError; }
  });

  Object.defineProperty(this, 'url', {
    get: function() { return _url; }
  });

  Object.defineProperty(this, 'headers', {
    get: function() { return _headers; }
  });

  Object.defineProperty(this, 'form', {
    get: function() { return _form; }
  });

}

APIRequest.prototype.post = function() {
  var that = this;

  request.post({
    url : APIRequest.url.base + this.url,
    headers: { 'X-Tidal-Token': APIRequest.token },
    form: this.form
  }, function(error, response, body) {
    if(error) {
      that.onError.broadcast({
        error: error,
        response: response, 
        body: body
      });
    }
    if (!error && response.statusCode == 200) {
      that.onResponse.broadcast({
        error: error,
        response: response, 
        body: body
      });
    }
  });
}

// static properties

Object.defineProperty(APIRequest, 'url', {
  get: function() {
    return {
      base: 'https://api.tidalhifi.com/v1',
      login: '/login/username'
    }
  }
});
Object.defineProperty(APIRequest, 'token', {
  get: function() { return '_KM2HixcUBZtmktH'; }
});


module.exports = APIRequest;