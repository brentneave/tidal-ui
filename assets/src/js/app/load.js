const
    routes = require('./routes'),
    update = require('./update');



const load = function(state) {

    console.log('load', state);

    const route = routes.get(state);

    if (route.load && !state.route.fresh)
        route.load({
            state: state,
            subpath: route.subpath
        }).then((response) =>
            update({
                action: 'SET_ROUTE_DATA',
                payload: {
                    path: state.path.str,
                    data: response
                }
            })
        );

}



module.exports = load;
