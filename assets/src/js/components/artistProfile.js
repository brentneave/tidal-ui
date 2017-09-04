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
    artistList = require('./artistList'),
    pageHeader = require('./pageHeader'),
    sectionHeader = require('./sectionHeader');



const artistProfile = function({ state, props, actions }) {

    console.log('artistProfile', props);

    const { details, albums, similar } = props;

    return {
        tagName: 'div',
        className: 'mw9 center',
        childNodes: [

            details && details.name ? pageHeader({
                props: {
                    title: details.name
                },
                actions
            }) : null,

            albums && albums.length ? sectionHeader({
                props: { title: 'Albums' }
            }) : null,

            albums && albums.length ? albumList({
                state: state,
                props: { albums },
                actions: actions
            }) : null,

            similar && similar.length ? sectionHeader({
                props: { title: 'Similar Artists' }
            }) : null,

            similar && similar.length ? artistList({
                state: state,
                props: { artists: similar },
                actions: actions
            }) : null

        ]

    }

}


module.exports = artistProfile;
