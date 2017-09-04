const
    actions = require('../app/actions'),
    api = require('../api/api'),
    page = require('../components/page'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader');




const load = function({ state, subpath }) {
    actions.loadFavoriteAlbums(state.session);
};



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Favorite Albums',
            content: state.data.favorites.albums ? albumList({
                state: state,
                props: { albums: state.data.favorites.albums },
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };
