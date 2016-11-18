const Session = require('./types/Session');

const ModelState = function() {
    Object.defineProperty(this, 'session', {
        value: new Session()
    });
    Object.defineProperty(this, 'artists', {
        value: []
    });
}

module.exports = new ModelState();
