const API = require('../api/API.js'),
      Utils = require('../utils/Utils.js');

module.exports = Object.freeze
({
    setRoute: function(state, path)
    {
        console.log('Router.setRoute');
        console.log(path);
        console.log(state);

        history.pushState(state, null, path);

        path = Utils.pathToArray(path);

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
                                .then
                                (
                                    function(similarArtists)
                                    {
                                        return API.loadMultipleArtistAlbums(state.session, artists.concat(similarArtists), 1);
                                    }
                                );
                            }
                        );
                        break;
                        case 'artists':
                            return API.loadFavoriteArtists(state.session)
                            .then
                            (
                                function(artists)
                                {
                                    return API.loadMultipleSimilarArtists(state.session, artists, 1);
                                }
                            );
                        break;
                    default:

                }
            default:
                break;
        }
    },
    updateCurrentRoute: function(state)
    {
        history.replaceState(state, null, window.location.pathname);
        return state;
    }
});
