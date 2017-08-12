const
    api = require('../api/api'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    page = require('../components/page');



const load = ({ state, subpath }) => ({

    artists: api.loadFavoriteArtists(state.session)

});



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Favorite Artists',
            content: state.route.data ? artistList({
                state: state,
                props: {
                    artists: state.route.data.artists || []
                },
                actions: actions
            }) : null
        },
        actions
    })

)


module.exports = { load, component };
