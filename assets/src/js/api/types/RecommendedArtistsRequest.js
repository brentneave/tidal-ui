const
    Broadcaster = require('../../events/Broadcaster'),
    APIConfig = require('../APIConfig'),
    APIRequest = require('../APIRequest'),
    SimilarArtistsRequest = require('./SimilarArtistsRequest');

const RecommendedArtistsRequest = function(session, artists)
{
    console.log('RecommendedArtistsRequest');
    console.log(session);
    console.log(artists);
    
    const _numArtists = artists.length,
          _similarArtists = [],
          _similarArtistsKeys = {},
          _body = { items: [] },
          _onError = new Broadcaster(),
          _onResponse = new Broadcaster(),
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
        _onError.broadcast
        (
            {
                source: _that,
                error: e.error,
                response: e.response,
                body: e.body
            }
        )

        if(_artistsChecked === _numArtists)
        {
            _finish();
        }
    }

    const _send = function()
    {
        var i, similarArtistsRequest;
        for(i=0; i<_numArtists; i++)
        {
            similarArtistsRequest = new SimilarArtistsRequest(session, artists[i]);
            similarArtistsRequest.responseAction = undefined;
            similarArtistsRequest.errorAction = undefined;
            similarArtistsRequest.onResponse.addListener(_that, _onSimiliarArtistsResponse);
            similarArtistsRequest.onError.addListener(_that, _onSimiliarArtistsError);
            similarArtistsRequest.form.limit = 1;
            similarArtistsRequest.send();
        }
    }

    Object.defineProperty(this, 'onResponse', { value: _onResponse });
    Object.defineProperty(this, 'onError', { value: _onError });
    Object.defineProperty(this, 'send', { value: _send });

    APIRequest.onCreateInstance.broadcast(this);
}

module.exports = RecommendedArtistsRequest;
