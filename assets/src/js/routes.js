const
    API = require('./api/API'),
    reduce = require('./reduce'),
    components = require('./routes/_all'),
    clone = require('./utils/clone');



const _loadFavouriteArtists = function(state) {

    return API.loadFavoriteArtists(state.session).then(

        function(response) {
            return reduce({
                state: state,
                action: 'SET_FAVORITE_ARTISTS',
                payload: {
                    artists: response
                }
            });
        }

    );

}


const _routes = {

    component: components.home,

    routes: {

        'default': {
            component: components.home
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

    const path = state.path.arr;

    var
        route = _routes,
        data = {},
        i = 0;

    path.map(function(segment) {

        if (route.routes) {
            route = route.routes[segment] ?
                route.routes[segment] :
                route.routes['default'];
        } else {
            route = route;
        }

        i++;

    });

    return {
        load: route.load,
        component: route.component
    };
}



module.exports = { get }
