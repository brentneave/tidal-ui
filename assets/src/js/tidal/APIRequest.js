var request = require('request'),
    Broadcaster = require('../events/Broadcaster');


// static properties


// constructor

function APIRequest(url, header, form) {
  
  var _onResponse = new Broadcaster(this),
      _onError = new Broadcaster(this),
      _header = header,
      _url = url,
      _form = form;

  Object.defineProperty(this, 'onResponse', {
    get: function() { return _onResponse; }
  });

  Object.defineProperty(this, 'onError', {
    get: function() { return _onError; }
  });

  Object.defineProperty(this, 'header', {
    get: function() { return _header; }
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

  request.post({
    url : this.url,
    form: this.form
  }, 

  function(error, response, body) {
    
    if(error) {
      that.onError.broadcast({
        error: error,
        response: response, 
        body: body
      });
    }

    else if (response.statusCode == 400 
          || response.statusCode == 401
          || response.statusCode == 403 
          || response.statusCode == 404) {
      that.onError.broadcast({
        error: error,
        response: response, 
        body: body
      });
    }

    else if (!error && response.statusCode == 200) {
      that.onResponse.broadcast({
        error: error,
        response: response, 
        body: body
      });
    }
    
  });
}


module.exports = APIRequest;