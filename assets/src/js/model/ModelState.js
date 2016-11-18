const Session = require('./types/Session');

const ModelState = function() {

    var _artists = [],
        _latestReleases = [];

    Object.defineProperty
    (
        this, 'session',
        {
            value: new Session()
        }
    );

    Object.defineProperty
    (
        this, 'artists',
        {
            set: function(a)
            {
                _artists = a;
            },
            get: function()
            {
                return _artists;
            }
        }
    );

    Object.defineProperty
    (
        this, 'latestReleases',
        {
            set: function(a)
            {
                _latestReleases = a;
            },
            get: function()
            {
                return _latestReleases;
            }
        }
    );
}

module.exports = new ModelState();
