const
    actions = require('../app/actions'),
    api = require('../api/api'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    page = require('../components/page');



const load = function({ state, subpath }) {
    actions.loadFavoriteArtists(state.session);
};



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Favorite Artists',
            content: state.data.favorites.artists ? artistList({
                state: state,
                props: {
                    artists: state.data.favorites.artists || []
                },
                actions: actions
            }) : null
        },
        actions
    })

)


module.exports = { load, component };
