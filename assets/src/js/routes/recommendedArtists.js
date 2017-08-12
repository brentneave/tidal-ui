const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader'),
    page = require('../components/page');



const load = ({ state, subpath }) => ({
    artists: api.loadRecommendedArtists(state.session, 1, 36)
})



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'Recommended Artists',
            content: artistList({
                state: state,
                props: state.route.data,
                actions: actions
            })
        },
        actions
    })

)



module.exports = { load, component };
