const
    api = require('./api/api'),
    reduce = require('./reduce'),
    components = require('./routes/_all'),
    clone = require('./utils/clone');



const _routes = {

    component: components.home,
    routes: {

        'default': {
            component: components.home
        },

        'artist': {
            routes: {

                'default': {
                    component: components.artist,
                    load: ({ state, subpath }) => api.loadArtistProfile(state.session, { id: subpath[0] })
                }

            }

        },

        'album': {
            routes: {

                'default': {
                    component: components.album,
                    load: ({ state, subpath }) => api.loadAlbum(state.session, { id: subpath[0] })
                }

            }
        },

        'latest': {
            routes: {

                'albums': {
                    component: components.latestAlbums,
                    load: ({ state, subpath }) => api.loadLatestAlbums(state.session)
                }

            }
        },

        'favorites': {
            component: 'favorites',
            routes: {

                'artists': {
                    component: components.favoriteArtists,
                    load: ({ state, subpath }) => api.loadFavoriteArtists(state.session)
                },

                'albums': {
                    component: components.favoriteAlbums,
                    load: ({ state, subpath }) => api.loadFavoriteAlbums(state.session)
                }

            }
        },

        'recommended': {
            routes: {

                'artists': {
                    component: components.recommendedArtists,
                    load: ({ state, subpath }) => api.loadRecommendedArtists(state.session, 1)
                },

                'albums': {
                    component: components.recommendedAlbums,
                    load: ({ state, subpath }) => api.loadRecommendedAlbums(state.session, 1, 1)
                }

            }
        }
    }
}




const get = function(state) {

    const path = state.path.arr;

    var
        route = _routes,
        subpath = path,
        data = {},
        i = 0;

    path.map((segment) => {

        if (route.routes) {
            subpath = path.slice(i);
            route = route.routes[segment] || route.routes['default'] || route;
        }
        // console.log('route:', route);

        i++;

    });


    return {
        load: route.load,
        component: route.component,
        subpath: subpath
    };

}



module.exports = { get }
