const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
    artistProfile = require('../components/artistProfile');



const load = ({ state, subpath }) => ({
    details: api.loadArtistDetails(state.session, { id: subpath[0] }),
    albums: api.loadArtistAlbums(state.session, { id: subpath[0] }),
    similar: api.loadSimilarArtists(state.session, { id: subpath[0] })
});



const component = function({ state, props, actions }) {

    const content = {
        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            artistProfile({
                state: state,
                props: state.route.data,
                actions: actions
            })
        ]
    }



    return loginCheck({
        state,
        props: {
            content: content
        },
        actions
    });



}



module.exports = { load, component };
