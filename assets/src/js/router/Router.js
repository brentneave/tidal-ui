const API = require('../api/API.js');

const isNotEmptyString = function(s)
{
    return s != "";
}
module.exports = Object.freeze
({
    setRoute: function(state, path)
    {
        console.log('Router.setRoute');
        console.log(path);
        console.log(state);
        console.log(API.loadFavoriteArtists);

        history.pushState(state, null, path);

        path = path.split('/').filter(isNotEmptyString);

        console.log(path);

        switch (path[0])
        {
            case 'favorites':
                switch (path[1])
                {
                    case 'artists':
                        console.log(state.session.user.id);
                        return API.loadFavoriteArtists(state.session);
                    default: break;
                }
                break;
            case 'recommended':
                switch (path[1])
                {
                    case 'albums':
                        return API.loadFavoriteArtists(state.session).then
                        (
                            function(artists)
                            {
                                return API.loadMultipleSimilarArtists(state.session, artists, 1)
                                .then(similarArtists)
                                {
                                    return API.loadMultipleArtistAlbums(state.session, artists.concat(similarArtists), 1);
                                }
                            }
                        )

                        break;
                        case 'artists':
                            return API.loadFavoriteArtists(state.session)
                            .then
                            (
                                function(artists)
                                {
                                    return API.loadMultipleSimilarArtists(state.session, artists, 1);
                                }
                            )

                        break;
                    default:

                }
            default:
                break;
        }
    }
});
