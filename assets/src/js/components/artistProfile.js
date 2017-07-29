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

    if (!props.artist) return { tagName: 'div' }

    const { details, albums, similar } = props.artist;

    return {
        tagName: 'div',
        childNodes: [{
                tagName: 'h1',
                textContent: details.name
            },
            artistImage({
                state: state,
                props: { artist: details, width: 960 },
                actions: actions
            }), {
                tagName: 'h2',
                textContent: 'Albums'
            },
            albumList({
                state: state,
                props: { albums },
                actions: actions
            }), {
                tagName: 'h2',
                textContent: 'Similar Artists'
            },
            artistList({
                state: state,
                props: { artists: similar },
                actions: actions
            })

        ]
    }

}


module.exports = artistProfile;
