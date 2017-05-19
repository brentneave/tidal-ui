const artistThumbnail = require('./artistThumbnail');



const artistList = function({ state, props, actions }) {



    const makeArtistThumbnail = function(artist) {
        return {
            tagName: 'div',
            className: 'l-thumbnail-grid__item',
            childNodes: artistThumbnail(state, { artist }, props)
        }
    };



    const
        artists = props.artists,
        artistThumbnails = artists.map(makeArtistThumbnail);



    return {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: artistThumbnails
    };



};



module.exports = artistList;
