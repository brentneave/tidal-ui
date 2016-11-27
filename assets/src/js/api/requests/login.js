const apiRequest = require('../apiRequest'),
      APIConfig = require('../APIConfig');

const resolve = function(response)
{
    console.log('API.login.resolve')
    console.log(response)
    return {
        countryCode: response.body.countryCode,
        id: response.body.sessionId,
        user:
        {
            id: response.body.userId,
        },
        loginError: null
    }
}

const reject = function(response)
{
    console.log('API.login.reject')
    console.log(response)
    return {
        user: null,
        countryCode: null,
        id: null,
        loginError: 'Login failed'
    }
}

module.exports = function(credentials)
{
    console.log('API.login');
    console.log(credentials);
    return apiRequest
    ({
        url: APIConfig.URLs.login,
        header: APIConfig.tokenHeader,
        method: APIConfig.method.post,
        parameters: credentials
    })
    .catch
    (
        reject
    )
    .then
    (
        resolve, reject
    )
}
