const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest'),
    ArtistsRequest = require('./ArtistsRequest');

const LatestReleasesRequest = function(session, artists)
{

    const _numArtists = artists.length,
          _albumsPerArtist = 1,
          _albumKeys = {},
          _albums = [],
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
          _responseAction = APIActions.RESPONSE_LATEST_RELEASES,
          _errorAction = APIActions.ERROR_LATEST_RELEASES,
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
        _onError.broadcast(e)
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
