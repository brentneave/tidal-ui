const artistThumbnail = require('./artistThumbnail');



const artistList = function({ state, props, actions }) {



    const makeThumb = function(artist) {
        return {
            tagName: 'div',
            className: 'l-thumbnail-grid__item',
            childNodes: artistThumbnail(state, { artist }, props)
        }
    };



    const
        artists = props.artists,
        thumbs = artists.map(makeThumb);



    return {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: thumbs
    };



};



module.exports = artistList;
