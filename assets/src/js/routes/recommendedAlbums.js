const
    api = require('../api/api'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader'),
    page = require('../components/page');



const load = ({ state, subpath }) => ({
    albums: api.loadRecommendedAlbums(state.session, 2, 1, 12)
})



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Recommended Albums',
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
