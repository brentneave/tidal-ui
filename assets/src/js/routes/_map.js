const
    api = require('../api/api'),
    artist = require('./artist'),
    album = require('./album'),
    favoriteArtists = require('./favoriteArtists'),
    recommendedArtists = require('./recommendedArtists'),
    favoriteAlbums = require('./favoriteAlbums'),
    recommendedAlbums = require('./recommendedAlbums'),
    latestAlbums = require('./latestAlbums'),
    favorites = require('./favorites'),
    home = require('./home'),
    recommended = require('./recommended');

module.exports = {

    component: home,
    routes: {

        'default': {
            component: home
        },

        'artist': {
            routes: {

                'default': {
                    component: artist,
                    load: ({ state, subpath }) =>
                        api.loadArtistProfile(state.session, { id: subpath[0] })
                }

            }

        },

        'album': {
            routes: {

                'default': {
                    component: album,
                    load: ({ state, subpath }) =>
                        api.loadAlbum(state.session, { id: subpath[0] })
                }

            }
        },

        'latest': {
            routes: {

                'albums': {
                    component: latestAlbums,
                    load: ({ state, subpath }) =>
                        api.loadLatestAlbums(state.session)
                }

            }
        },

        'favorites': {
            component: 'favorites',
            routes: {

                'artists': {
                    component: favoriteArtists,
                    load: ({ state, subpath }) =>
                        api.loadFavoriteArtists(state.session)
                },

                'albums': {
                    component: favoriteAlbums,
                    load: ({ state, subpath }) =>
                        api.loadFavoriteAlbums(state.session)
                }

            }
        },

        'recommended': {
            routes: {

                'artists': {
                    component: recommendedArtists,
                    load: ({ state, subpath }) =>
                        api.loadRecommendedArtists(state.session, 1)
                },

                'albums': {
                    component: recommendedAlbums,
                    load: ({ state, subpath }) =>
                        api.loadRecommendedAlbums(state.session, 1, 1)
                }

            }
        }
    }
}
