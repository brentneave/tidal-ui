const Broadcaster = require('../events/Broadcaster');

const ViewActions = function()
{
    const _requests = new Broadcaster();
    Object.defineProperty(this, 'requests', { value: _requests });
}

module.exports = new ViewActions();
