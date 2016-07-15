var request = require('request'),
    Broadcaster = require('../events/Broadcaster');


// static properties

Object.defineProperty(APIRequest, 'method', {
  value: Object.freeze({
    get: 'get',
    post: 'post'
  })
});

// constructor

function APIRequest(url, header, form, method) {

  if (method != APIRequest.method.get && method != APIRequest.method.post) {
    throw new Error('Provide a valid method')
  }

  const _onResponse = new Broadcaster(),
        _onError = new Broadcaster(),
        _header = header,
        _url = url,
        _form = form,
        _method = method;

  Object.defineProperty(this, 'onResponse', {
    value: _onResponse
  });

  Object.defineProperty(this, 'onError', {
    value: _onError
  });

  Object.defineProperty(this, 'header', {
    value: _header
  });

  Object.defineProperty(this, 'url', {
    value: _url
  });

  Object.defineProperty(this, 'form', {
    value: _form
  });

  Object.defineProperty(this, 'method', {
    value: _method
  });

}

// public methods

APIRequest.prototype.send = function() {

  var that = this;
  var callback = function(error, response, body) {

    body = JSON.parse(body);

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
  };

  if(this.method === APIRequest.method.get) {
    request.get({
      url : this.url,
      headers: this.header,
      qs: this.form
    }, callback);
  }

  else if(this.method === APIRequest.method.post) {
    request.post({
      url : this.url,
      headers: this.header,
      form: this.form
    }, callback);
  }
}

module.exports = APIRequest;
