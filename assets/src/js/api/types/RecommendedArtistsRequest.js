const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest'),
    SimilarArtistsRequest = require('./SimilarArtistsRequest');

const RecommendedArtistsRequest = function(session, artists)
{
    const _numArtists = artists.length,
          _similarArtists = [],
          _similarArtistsKeys = {},
          _body = { items: [] },
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
          _responseAction = APIActions.RESPONSE_RECOMMENDED_ARTISTS,
          _errorAction = APIActions.ERROR_RECOMMENDED_ARTISTS,
          _that = this;

    var _artistsChecked = 0;

    const _finish = function()
    {
        _onResponse.broadcast
        (
            {
                source: _that,
                error: null,
                response: null,
                body: { items: _similarArtists }
            }
        )
    }

    const _onSimiliarArtistsResponse = function(e)
    {
        var i,
        n = e.body.items.length,
        item;

        for(i=0; i<n; i++)
        {
            item = e.body.items[i];
            if(!_similarArtistsKeys[item.id])
            {
                _similarArtistsKeys[item.id] = item;
                _similarArtists.push(_similarArtistsKeys[item.id]);
            }
        }

        _artistsChecked++;
        if(_artistsChecked === _numArtists)
        {
            _finish();
        }
    }

    const _onSimiliarArtistsError = function(e)
    {
        _artistsChecked++;

        if(_artistsChecked === _numArtists)
        {
            _finish();
        }
    }

    var i, similarArtistsRequest, that = this;
    for(i=0; i<_numArtists; i++)
    {
        similarArtistsRequest = new SimilarArtistsRequest(session, artists[i]);
        similarArtistsRequest.responseAction = undefined;
        similarArtistsRequest.errorAction = undefined;
        similarArtistsRequest.onResponse.addListener(that, _onSimiliarArtistsResponse);
        similarArtistsRequest.onError.addListener(that, _onSimiliarArtistsError);
        similarArtistsRequest.form.limit = 2;
        similarArtistsRequest.send();
    }

    Object.defineProperty(this, 'onResponse', { value: _onResponse });
    Object.defineProperty(this, 'onError', { value: _onError });
    Object.defineProperty(this, 'responseAction', { value: _responseAction });
    Object.defineProperty(this, 'errorAction', { value: _errorAction });

    APIRequest.onCreateInstance.broadcast(this);
}

module.exports = RecommendedArtistsRequest;
