const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
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



const component = function({ state, props, actions }) {

    return loginCheck({
        state,
        props: {
            content: {
                tagName: 'div',
                childNodes: [

                    nav({
                        state: state,
                        actions: actions
                    }),

                    state.route.data ? albumDetails({
                        state: state,
                        props: {
                            details: state.route.data.details,
                            tracks: state.route.data.tracks,
                            similar: state.route.data.similar
                        },
                        actions: actions
                    }) : {
                        tagName: 'div'
                    }
                ]
            }
        },
        actions
    });

}



module.exports = { load, component };
