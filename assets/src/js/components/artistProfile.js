/*
details: {
    id: 4315444,
    name: "A$AP Rocky",
    picture: "71c765d6-c429-4ed8-9355-c033615214ee",
    popularity: 91,
    url: "http://www.tidal.com/artist/4315444"
}
*/


const
    artistImage = require('./artistImage'),
    albumList = require('./albumList'),
    artistList = require('./artistList');



const artistProfile = function({ state, props, actions }) {

    console.log('artistProfile', props);

    const { details, albums, similar } = props;

    return {
        tagName: 'div',
        childNodes: [
            details ? {
                tagName: 'h1',
                textContent: details.name
            } : null,
            details ? artistImage({
                state: state,
                props: { artist: details, width: 960 },
                actions: actions
            }) : null,
            albums ? {
                tagName: 'h2',
                textContent: 'Albums'
            } : null,
            albums ? albumList({
                state: state,
                props: { albums },
                actions: actions
            }) : null,
            similar ? {
                tagName: 'h2',
                textContent: 'Similar Artists'
            } : null,
            similar ? artistList({
                state: state,
                props: { artists: similar },
                actions: actions
            }) : null
        ]
    }

}


module.exports = artistProfile;
