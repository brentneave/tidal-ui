const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIRequest = require('../APIRequest'),
    ArtistsRequest = require('./ArtistsRequest');

const LatestReleasesRequest = function(session, artists)
{
    console.log('LatestReleasesRequest');
    console.log(session);
    console.log(artists);

    const _numArtists = artists.length,
          _albumsPerArtist = 1,
          _albumKeys = {},
          _albums = [],
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
          _that = this;

    var _artistsLoaded = 0;

    const _onAlbumResponse = function(e)
    {
        var i,
        n = e.body.items.length,
        item;

        for(i=0; i<n; i++)
        {
            item = e.body.items[i];
            if(!_albumKeys[item.id])
            {
                _albumKeys[item.id] = item;
                _albums.push(_albumKeys[item.id]);
            }
        }

        _artistsLoaded++;
        if(_artistsLoaded === _numArtists)
        {
            _albums.items = _albums.sort
            (
                function(a, b)
                {
                    const aDate = Date.parse(a.streamStartDate.slice(0,10)),
                          bDate = Date.parse(b.streamStartDate.slice(0,10));
                    if(aDate >= bDate)
                    {
                        return -1;
                    }
                    else if(aDate < bDate)
                    {
                        return 1;
                    }
                }
            );
            _onResponse.broadcast
            (
                {
                    source: _that,
                    error: null,
                    response: null,
                    body: { items: _albums }
                }
            )
        }
    }

    const _onAlbumError = function(e)
    {
        console.log('_that.errorAction = ' + _that.errorAction);
        _onError.broadcast
        (
            {
                source: _that,
                error: e.error,
                response: e.response,
                body: e.body
            }
        )
    }

    var i, artistAlbumRequest, that = this;
    for(i=0; i<_numArtists; i++)
    {
        artistAlbumRequest = new APIRequest();
        artistAlbumRequest.url = APIConfig.URLs.artistAlbums(artists[i].id);
        artistAlbumRequest.header = APIConfig.sessionHeader(session.id);
        artistAlbumRequest.method = APIRequest.method.get;
        artistAlbumRequest.form =
        {
            countryCode: session.countryCode,
            limit: _albumsPerArtist
        };
        artistAlbumRequest.onResponse.addListener(that, _onAlbumResponse);
        artistAlbumRequest.onError.addListener(that, _onAlbumError);
        artistAlbumRequest.send();
    }

    // pretty much we’re just spoofing an APIRequest object here so that we can send the accumulated results of all of those requests in one big bunch
    Object.defineProperty(this, 'onResponse', { value: _onResponse });
    Object.defineProperty(this, 'onError', { value: _onError });
    Object.defineProperty(this, 'responseAction', { value: _responseAction });
    Object.defineProperty(this, 'errorAction', { value: _errorAction });
    APIRequest.onCreateInstance.broadcast(this);
}

module.exports = LatestReleasesRequest;
