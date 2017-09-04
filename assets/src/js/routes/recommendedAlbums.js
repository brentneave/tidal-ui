const
    actions = require('../app/actions'),
    api = require('../api/api'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader'),
    page = require('../components/page');



const load = function({ state, subpath }) {
    actions.loadRecommendedAlbums(state.session);
};



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Recommended Albums',
            content: state.data.recommended.albums ? albumList({
                state: state,
                props: { albums: state.data.recommended.albums },
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };