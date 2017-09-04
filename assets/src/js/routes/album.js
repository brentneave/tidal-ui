const
    actions = require('../app/actions'),
    router = require('../app/router'),
    api = require('../api/api'),
    page = require('../components/page'),
    albumDetails = require('../components/albumDetails');



const load = function({ state, subpath }) {

    const id = router.get(state).subpath[0];

    actions.loadAlbumDetails(state.session, { id });
    actions.loadAlbumTracks(state.session, { id });
    actions.loadSimilarAlbums(state.session, { id });

}



const component = ({ state, props, actions }) => {

    const id = router.get(state).subpath[0];

    return page({
        state,
        props: {
            content: state.data.albums[id] ? albumDetails({
                state: state,
                props: {
                    details: state.data.albums[id].details,
                    tracks: state.data.albums[id].tracks,
                    similar: state.data.albums[id].similar
                },
                actions: actions
            }) : null
        },
        actions
    })

}



module.exports = { load, component };