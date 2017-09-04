const
    actions = require('../app/actions'),
    router = require('../app/router'),
    api = require('../api/api'),
    page = require('../components/page'),
    artistProfile = require('../components/artistProfile');



const load = function({ state, subpath }) {
    actions.loadArtistDetails(state.session, { id: subpath[0] });
    actions.loadArtistAlbums(state.session, { id: subpath[0] });
    actions.loadSimilarArtists(state.session, { id: subpath[0] });
};


const component = ({ state, props, actions }) => {

    const id = router.get(state).subpath[0];

    return page({
        state,
        props: {
            content: state.data.artists[id] ? artistProfile({
                state: state,
                props: state.data.artists[id],
                actions: actions
            }) : null
        },
        actions
    })

};




module.exports = { load, component };