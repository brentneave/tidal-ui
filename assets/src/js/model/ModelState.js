const Session = require('./types/Session');

const ModelState = function() {

    var _artists = [],
        _recommendedArtists = [],
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
        this, 'recommendedArtists',
        {
            set: function(a)
            {
                _recommendedArtists = a;
            },
            get: function()
            {
                return _recommendedArtists;
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
