const
    APIConfig = require('../APIConfig'),
    APIRequest = require('../APIRequest');

const LoginRequest = function(username, password)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.login;
    this.header = APIConfig.tokenHeader;
    this.method = APIRequest.method.post;
    this.form =
    {
        username: username,
        password: password
    };
}

LoginRequest.prototype = new APIRequest();

module.exports = LoginRequest;
