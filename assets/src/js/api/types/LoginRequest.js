const
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest');

const LoginRequest = function(username, password)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.login;
    this.header = APIConfig.tokenHeader;
    this.method = APIRequest.method.post;
    this.responseAction = APIActions.RESPONSE_LOGIN;
    this.errorAction = APIActions.ERROR_LOGIN;
    this.form =
    {
        username: username,
        password: password
    };
}

LoginRequest.prototype = new APIRequest();

module.exports = LoginRequest;
