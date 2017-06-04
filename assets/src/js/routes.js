const
    api = require('./api/api'),
    reduce = require('./reduce'),
    components = require('./routes/_all'),
    clone = require('./utils/clone');



// const _loadFavouriteArtists = function({ state, subpath }) {
//     console.log('_loadFavouriteArtists', arguments);
//     return api.loadFavoriteArtists(state.session);
// }



// const _loadArtistProfile = function({ state, subpath }) {
//     return api.loadArtistProfile(state.session, { id: subpath[0] });
// }



// const _loadRecommendedArtists = function({ state, subpath }) {
//     return api.loadRecommendedArtists(state.session, 2);
// }



// const _loadRecommendedAlbums = function({ state, subpath }) {
//     return api.loadRecommendedAlbums(state.session);
// }



// const _loadFavoriteAlbums = function({ state, subpath }) {
//     return api.loadFavoriteAlbums(state.session);
// }



// const _loadAlbum = function({ state, subpath }) {
//     return api.loadAlbum(state.session, { id: subpath[0] });
// }



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
                    load: ({ state, subpath }) => api.loadRecommendedArtists(state.session, 2)
                },

                'albums': {
                    component: components.recommendedAlbums,
                    load: ({ state, subpath }) => api.loadRecommendedAlbums(state.session)
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
