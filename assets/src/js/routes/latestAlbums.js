const
    api = require('../api/api'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    page = require('../components/page');



const load = ({ state, subpath }) => ({
    albums: api.loadLatestAlbums(state.session)
});



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'New Albums',
            content: state.route.data ? albumList({
                state: state,
                props: state.route.data,
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };
