const Broadcaster = require('../events/Broadcaster');
const LocalStorageDispatcher = function()
{
    Object.defineProperty(this, 'notifications', { value: new Broadcaster() });
}
module.exports = new LocalStorageDispatcher();
