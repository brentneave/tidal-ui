const request = require('request');


const callback = function(response, resolve, reject)
{
    (!response.error && response.response.statusCode == 200) ? resolve(response) : reject(response);
}

const send = function(args, callback, resolve, reject)
{
    request[args.method]
    (
        {
            url : args.url,
            headers: args.header,
            form: args.form
        },
        function(error, response, body)
        {
            body = JSON.parse(body);
            callback({ error: error, response: response, body: body }, resolve, reject)
        }
    );
}

module.exports = function(args)
{
    return new Promise(
        function(resolve, reject)
        {
            send(args, callback, resolve, reject);
        }
    );
}
