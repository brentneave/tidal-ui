const
    api = require('../api/api'),
    page = require('../components/page'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader');



const load = ({ state, subpath }) => ({

    albums: api.loadFavoriteAlbums(state.session)

});



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Favorite Albums',
            content: state.route.data.albums ? albumList({
                state: state,
                props: { albums: state.route.data.albums },
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };
