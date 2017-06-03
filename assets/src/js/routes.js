const
    api = require('./api/api'),
    reduce = require('./reduce'),
    components = require('./routes/_all'),
    clone = require('./utils/clone');



const _loadFavouriteArtists = function({ state, subpath }) {

    return api.loadFavoriteArtists(state.session)
        .then(
            (response) => reduce({
                state: state,
                action: 'SET_ROUTE_DATA',
                payload: { data: response }
            })
        );

}




const _loadArtistProfile = function({ state, subpath }) {

    console.log('_loadArtistProfile', state, subpath);

    return api.loadArtistProfile(state.session, { id: subpath[0] })
        .then(
            (response) => reduce({
                state: state,
                action: 'SET_ROUTE_DATA',
                payload: { data: response }
            })
        );

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
                    component: components.favoriteAlbums
                }

            }
        },

        'recommended': {
            component: components.recommended
        }

    }

};




const get = function(state) {

    // console.log('routes.get', state, state.path.arr);

    const path = state.path.arr;

    var
        route = _routes,
        subpath = path,
        data = {},
        i = 0;

    path.map(function(segment) {

        if (route.routes) {
            subpath = path.slice(i);
            route = route.routes[segment] || route.routes['default'] || route;
            // console.log('segment:', segment, 'i:', i, 'subpath:', subpath, 'route:', route);
        }

        i++;

    });

    // console.log('route:', {
    //     load: route.load,
    //     component: route.component,
    //     subpath: subpath
    // })

    return {
        load: route.load,
        component: route.component,
        subpath: subpath
    };
}



module.exports = { get }
