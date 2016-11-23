const request = require('request'),
    APIConfig = require('./APIConfig'),
    Broadcaster = require('../events/Broadcaster'),
    Action = require('../events/Action'),
    ListOf = require('../utils/ListOf');


const APIRequest = function(url, header, form, method, responseAction, errorAction) {

  // const _actions = new Broadcaster();
  const _onResponse = new Broadcaster();
  const _onError = new Broadcaster();

  var _header,
      _url,
      _form,
      _method;

  Object.defineProperty(this, 'onResponse', {
      value: _onResponse
  });

  Object.defineProperty(this, 'onError', {
      value: _onError
  });

  Object.defineProperty(this, 'header', {
    get: function() {
      return _header;
    },
    set: function(o) {
      _header = o;
    }
  });

  Object.defineProperty(this, 'url', {
    get: function() {
      return _url;
    },
    set: function(s) {
      _url = s;
    }
  });

  Object.defineProperty(this, 'form', {
    get: function() {
      return _form;
    },
    set: function(o) {
      _form = o;
    }
  });

  Object.defineProperty(this, 'method', {
    get: function() {
      return _method;
    },
    set: function(s) {
      if (s == APIRequest.method.get || s == APIRequest.method.post) {
        _method = s;
      } else {
        throw new Error('Provide a valid method.')
      }
    }
  });

  this.url    = url    ? url    : APIConfig.baseURL;
  this.header = header ? header : APIConfig.tokenHeader;
  this.form   = form   ? form   : {};
  this.method = method ? method : APIRequest.method.get;

  APIRequest.onCreateInstance.broadcast(this);

}

Object.defineProperty(APIRequest, 'method', {
  value: Object.freeze({
    get: 'get',
    post: 'post'
  })
});

Object.defineProperty(APIRequest, 'onCreateInstance', {
  value: new Broadcaster()
});

// public methods

Object.defineProperty(APIRequest.prototype, 'send', {
    value: function() {

        const that = this;
        const callback = function(error, response, body) {

            body = JSON.parse(body);

            if(error)
            {
                that.onError.broadcast
                (
                    {
                        source: that,
                        error: error,
                        response: response,
                        body: body
                    }
                )
            }

            else if
            (
                response.statusCode == 400
                || response.statusCode == 401
                || response.statusCode == 403
                || response.statusCode == 404
            )
            {
                that.onError.broadcast
                (
                    {
                        source: that,
                        error: error,
                        response: response,
                        body: body
                    }
                );
            }

            else if (!error && response.statusCode == 200)
            {
                that.onResponse.broadcast
                (
                    {
                        source: that,
                        error: error,
                        response: response,
                        body: body
                    }
                );
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

        return this;
    }
});

module.exports = APIRequest;
