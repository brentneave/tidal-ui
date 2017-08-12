const
    api = require('../api/api'),
    page = require('../components/page'),
    albumDetails = require('../components/albumDetails');



const load = function({ state, subpath }) {

    const
        session = state.session,
        id = subpath[0];

    return {
        details: api.loadAlbumDetails(session, { id }),
        tracks: api.loadAlbumTracks(session, { id }),
        similar: api.loadSimilarAlbums(session, { id })
    }

}



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            content: state.route.data ? albumDetails({
                state: state,
                props: {
                    details: state.route.data.details,
                    tracks: state.route.data.tracks,
                    similar: state.route.data.similar
                },
                actions: actions
            }) : null
        },
        actions
    })

)



module.exports = { load, component };
