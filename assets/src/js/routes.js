const
    api = require('./api/api'),
    reduce = require('./reduce'),
    components = require('./routes/_all'),
    clone = require('./utils/clone');



const _loadFavouriteArtists = function({ state, subpath }) {
    console.log('_loadFavouriteArtists', arguments);
    return api.loadFavoriteArtists(state.session);
}



const _loadArtistProfile = function({ state, subpath }) {
    return api.loadArtistProfile(state.session, { id: subpath[0] });
}



const _loadRecommendedArtists = function({ state, subpath }) {
    return api.loadRecommendedArtists(state.session, 5);
}



const _loadRecommendedAlbums = function({ state, subpath }) {
    return api.loadRecommendedAlbums(state.session);
}



const _loadFavoriteAlbums = function({ state, subpath }) {
    return api.loadFavoriteAlbums(state.session);
}



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
                    load: _loadArtistProfile
                }

            }

        },

        'favorites': {
            component: 'favorites',
            routes: {

                'artists': {
                    component: components.favoriteArtists,
                    load: _loadFavouriteArtists
                },

                'albums': {
                    component: components.favoriteAlbums,
                    load: _loadFavoriteAlbums
                }
            }

        },

        'recommended': {
            routes: {

                'artists': {
                    component: components.recommendedArtists,
                    load: _loadRecommendedArtists
                },

                'albums': {
                    component: components.recommendedAlbums,
                    load: _loadRecommendedAlbums
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
