module.exports = Object.freeze
({
    setRoute: function(state, path)
    {
        console.log('Router.setRoute');
        console.log(path);
        console.log(state);

        history.pushState(state, null, path);

        path = path.split('/');

        switch (path[0])
        {
            case 'favorites':
                switch (path[1])
                {
                    case 'artists': return loadFavoriteArtists(state.sesion);
                    default: break;
                }
                break;
            case 'recommended':
                switch (path[1])
                {
                    case 'albums':
                        return loadFavoriteArtists(state.session)
                            .then
                            (
                                function(artists)
                                {
                                    return loadMultipleSimilarArtists(state.session, artists, 1)
                                        .then(similarArtists)
                                        {
                                            return loadMultipleArtistAlbums(state.session, artists.concat(similarArtists), 1);
                                        }
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
