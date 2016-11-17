const
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest'),
    ArtistsRequest = require('./ArtistsRequest');

const LatestReleasesRequest = function(artists, session)
{

    const _numArtists = artists.length,
          _albumsPerArtist = 2,
          _albums = [],
          _body = { items: [] };

    var _artistsLoaded = 0;

    const _onAlbumResponse = function(e)
    {
        // console.log(e)
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

            console.log('loaded all artists’ albums');
            console.log(_body);
        }
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
    }
}

module.exports = LatestReleasesRequest;
