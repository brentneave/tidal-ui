const
    actions = require('../app/actions'),
    api = require('../api/api'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    page = require('../components/page');



const load = function({ state, subpath }) {
    actions.loadLatestAlbums(state.session);
};



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Recent Releases',
            content: state.data.latest.albums ? albumList({
                state: state,
                props: { albums: state.data.latest.albums },
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };