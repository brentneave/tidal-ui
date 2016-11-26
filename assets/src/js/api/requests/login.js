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

const reject = function(args)
{
    console.log('API.login.reject')
    return {
        user: null,
        countryCode: null,
        id: null,
        loginError: 'Login failed'
    }
}

module.exports = function(form)
{
    console.log('API.login');
    console.log(form);
    return apiRequest
    ({
        url: APIConfig.URLs.login,
        header: APIConfig.tokenHeader,
        form: form,
        method: APIConfig.method.post
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
