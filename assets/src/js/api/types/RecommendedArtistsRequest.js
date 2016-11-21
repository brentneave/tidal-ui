const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest'),
    ArtistsRequest = require('./ArtistsRequest');

const LatestReleasesRequest = function(artists, session)
{

    const _numArtists = artists.length,
          _similiarArtists = [],
          _body = { items: [] },
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
          _responseAction = APIActions.RESPONSE_RECOMMENDED_ARTISTS,
          _errorAction = APIActions.ERROR_RECOMMENDED_ARTISTS

    var _artistsChecked = 0;

    const _onSimiliarArtistsResponse = function(e)
    {
        var i, n = e.body.items.length;
        for(i=0; i<n; i++)
        {
            _body.items.push(e.body.items[i]);
        }
        _artistsChecked++;
        if(_artistsChecked === _numArtists)
        {

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

    const _onSimiliarArtistsError = function(e)
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
        artistAlbumRequest.onResponse.addListener(that, _onSimiliarArtistsResponse);
        artistAlbumRequest.onError.addListener(that, _onSimiliarArtistsError);
    }

    // pretty much we’re just spoofing an APIRequest object here so that we can send the accumulated results of all of those requests in one big bunch
    Object.defineProperty(this, 'onResponse', { value: _onResponse });
    Object.defineProperty(this, 'onError', { value: _onError });
    Object.defineProperty(this, 'responseAction', { value: _responseAction });
    Object.defineProperty(this, 'errorAction', { value: _errorAction });
    APIRequest.onCreateInstance.broadcast(this);
}

module.exports = LatestReleasesRequest;
