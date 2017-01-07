const Broadcaster = require('../events/Broadcaster');
module.exports = Object.freeze
({
    login: new Broadcaster(),
    setRoute: new Broadcaster()
});
