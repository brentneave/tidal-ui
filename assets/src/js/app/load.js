const
    routes = require('./routes'),
    update = require('./update');



const load = function(state) {

    console.log('load', state);

    const { load, subpath } = routes.get(state);

    return (load && !state.route.fresh) ?
        load({
            state: state,
            subpath: subpath
        }).then(
            (response) => ({
                action: 'SET_ROUTE_DATA',
                payload: {
                    path: state.path.str,
                    data: response
                }
            })
        ) :
        Promise.reject()

}



module.exports = load;
