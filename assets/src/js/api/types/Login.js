const APIRequest = require('../APIRequest'),
      APIConfig = require('../APIConfig'),
      APIActions = require('../APIActions'),
      Session = require('../../model/types/Session'),
      User = require('../../model/types/User');

const Login = function() {

  APIRequest.prototype.constructor.call(this);

  this.url = APIConfig.URLs.login;
  this.header = APIConfig.tokenHeader;
  this.form = null;
  this.method = APIRequest.method.post;
  this.responseAction = APIActions.RESPONSE_LOGIN;
  this.errorAction = APIActions.ERROR_LOGIN;
}

Login.prototype = new APIRequest();

module.exports = new Login();
