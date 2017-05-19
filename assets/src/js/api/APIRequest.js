const request = require('request'),
    APIConfig = require('./APIConfig');

const callback = function(response, resolve, reject) {
    (!response.error && response.response.statusCode == 200) ? resolve(response): reject(response);
}

const send = function(options, resolve, reject) {
    var requestOptions;

    switch (options.method) {
        case APIConfig.method.get:
            requestOptions = {
                url: options.url,
                headers: options.header,
                qs: options.parameters
            }
            break;
        case APIConfig.method.post:
            requestOptions = {
                url: options.url,
                headers: options.header,
                form: options.parameters
            }
            break;
        default:
            break;
    }

    request[options.method](
        requestOptions,
        function(error, response, body) {
            body = JSON.parse(body);
            callback({
                    error: error,
                    response: response,
                    body: body
                },
                resolve,
                reject
            )
        }
    );
}

module.exports = function(options) {
    return new Promise(
        function(resolve, reject) {
            send(options, resolve, reject);
        }
    );
}
