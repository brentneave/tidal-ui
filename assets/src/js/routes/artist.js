const
    api = require('../api/api'),
    page = require('../components/page'),
    artistProfile = require('../components/artistProfile');



const load = ({ state, subpath }) => ({
    details: api.loadArtistDetails(state.session, { id: subpath[0] }),
    albums: api.loadArtistAlbums(state.session, { id: subpath[0] }),
    similar: api.loadSimilarArtists(state.session, { id: subpath[0] })
});


const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            content: state.route.data.albums ? artistProfile({
                state: state,
                props: state.route.data,
                actions: actions
            }) : null
        },
        actions
    })

)




module.exports = { load, component };
