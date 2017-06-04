const
    routes = require('./routes'),
    update = require('./update');



const load = function(state) {

    console.log('load', state);

    const { load, subpath } = routes.get(state);

    if (load && !state.route.fresh) {
        update(
            load({
                state: state,
                subpath: subpath
            }).then(
                (response) => ({
                    state: state,
                    action: 'SET_ROUTE_DATA',
                    payload: {
                        path: state.path.str,
                        data: response
                    }
                })
            ).then(
                update
            )
        );
    }

}



module.exports = load;
