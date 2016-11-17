const Session = require('./types/Session');

const ModelState = function() {
    Object.defineProperty(this, 'session', {
        value: new Session()
    });
}

module.exports = new ModelState();
