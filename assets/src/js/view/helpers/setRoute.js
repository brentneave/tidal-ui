const ViewEvents = require('../ViewEvents');

module.exports = function(e)
{
    console.log('setRoute');
    console.log(e);

    e.preventDefault();

    const path = e.target.getAttribute('href');
    ViewEvents.setRoute.broadcast(path);

    return false;
}
