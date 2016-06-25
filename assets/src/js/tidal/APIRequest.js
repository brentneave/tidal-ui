var request = require('request'),
    Broadcaster = require('../events/Broadcaster');


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

Object.defineProperty(APIRequest, 'header', {
  get: function() { return { 'X-Tidal-Token': APIRequest.token }; }
});

// constructor

function APIRequest(url, form) {
  var _onResponse = new Broadcaster(this),
      _onError = new Broadcaster(this),
      _url = APIRequest.url.base + url,
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

  Object.defineProperty(this, 'form', {
    get: function() { return _form; }
  });

}

// public methods

APIRequest.prototype.post = function() {
  var that = this;

  console.log('APIRequest.post: ' + this.url + ', ' + this.form);
  request.post({
    url : this.url,
    headers: APIRequest.header,
    form: this.form
  }, function(error, response, body) {
    console.log('callback');
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


module.exports = APIRequest;