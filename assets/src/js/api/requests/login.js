const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    console.log('API.login.resolve')
    console.log(response)
    return {
        session: {
            countryCode: response.body.countryCode,
            id: response.body.sessionId,
            user: {
                id: response.body.userId,
            }
        }
    }
}

const reject = function(error) {
    console.log('API.login.reject')
    console.log(error)
    return {
        error: error
    }
}

module.exports = function(credentials) {
    console.log('API.login');
    console.log(credentials);
    return apiRequest({
            url: config.URLs.login,
            header: config.tokenHeader,
            method: config.method.post,
            parameters: credentials
        })
        .then(resolve, reject);
}
