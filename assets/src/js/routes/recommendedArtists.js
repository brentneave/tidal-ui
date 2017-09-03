const
    actions = require('../app/actions'),
    api = require('../api/api'),
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader'),
    page = require('../components/page');



const load = function({ state, subpath }) {
    actions.loadRecommendedArtists(state.session);
};



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Recommended Artists',
            content: artistList({
                state: state,
                props: { artists: state.data.recommended.artists },
                actions: actions
            })
        },
        actions
    })

)



module.exports = { load, component };