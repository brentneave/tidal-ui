const artistThumb = require('./artistThumb');



const artistList = function({ state, props, actions }) {

    const makeThumb = function(artist) {
        return {
            tagName: 'div',
            className: 'l-thumbnail-grid__item',
            childNodes: artistThumb(state, { artist }, actions)
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
