const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest'),
    ArtistsRequest = require('./ArtistsRequest');

const LatestReleasesRequest = function(artists, session)
{

    const _numArtists = artists.length,
          _albumsPerArtist = 2,
          _albums = [],
          _body = { items: [] },
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
          _responseAction = APIActions.RESPONSE_LATEST_RELEASES,
          _errorAction = APIActions.ERROR_LATEST_RELEASES;

    var _artistsLoaded = 0;

    const _onAlbumResponse = function(e)
    {
        console.log('loaded album')
        var i, n = e.body.items.length;
        for(i=0; i<n; i++)
        {
            _body.items.push(e.body.items[i]);
        }
        _artistsLoaded++;
        if(_artistsLoaded === _numArtists)
        {
            _body.items = _body.items.sort
            (
                function(a, b)
                {
                    const aDate = Date.parse(a.streamStartDate.slice(0,10)),
                          bDate = Date.parse(b.streamStartDate.slice(0,10));
                    if(aDate > bDate)
                    {
                        return -1;
                    }
                    else if(aDate < bDate)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            );
            console.log('loaded all artists albums')
            _onResponse.broadcast
            (
                {
                    source: this,
                    error: null,
                    response: null,
                    body: _body
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
        artistAlbumRequest.header = APIConfig.sessionHeader(session);
        artistAlbumRequest.method = APIRequest.method.get;
        artistAlbumRequest.form =
        {
            countryCode: session.countryCode,
            limit: _albumsPerArtist
        };
        artistAlbumRequest.send();
        artistAlbumRequest.onResponse.addListener(that, _onAlbumResponse);
        artistAlbumRequest.onError.addListener(that, _onAlbumError);
    }

    // pretty much we’re just spoofing an APIRequest object here so that we can send the accumulated results of all of those requests in one big bunch
    Object.defineProperty(this, 'onResponse', { value: _onResponse });
    Object.defineProperty(this, 'onError', { value: _onError });
    Object.defineProperty(this, 'responseAction', { value: _responseAction });
    Object.defineProperty(this, 'errorAction', { value: _errorAction });
    APIRequest.onCreateInstance.broadcast(this);
}

module.exports = LatestReleasesRequest;
