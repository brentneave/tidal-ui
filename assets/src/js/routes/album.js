const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
    albumDetails = require('../components/albumDetails');



const load = ({ state, subpath }) =>
    api.loadAlbum(state.session, { id: subpath[0] });



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
                            album: state.route.data.album,
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
