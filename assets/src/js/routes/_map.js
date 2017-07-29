const
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

    component: home.component,

    routes: {

        'default': {
            component: home.component
        },

        'artist': {
            routes: {

                'default': {
                    component: artist.component,
                    load: artist.load
                }

            }

        },

        'album': {
            routes: {

                'default': {
                    component: album.component,
                    load: album.load
                }

            }
        },

        'latest': {
            routes: {

                'albums': {
                    component: latestAlbums.component,
                    load: latestAlbums.load
                }

            }
        },

        'favorites': {
            component: 'favorites',
            routes: {

                'artists': {
                    component: favoriteArtists.component,
                    load: favoriteArtists.load
                },

                'albums': {
                    component: favoriteAlbums.component,
                    load: favoriteAlbums.load
                }

            }
        },

        'recommended': {
            routes: {

                'artists': {
                    component: recommendedArtists.component,
                    load: recommendedArtists.load
                },

                'albums': {
                    component: recommendedAlbums.component,
                    load: recommendedAlbums.load
                }

            }
        }
    }
}
