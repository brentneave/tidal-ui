const artistThumbnail = require('./artistThumbnail');

module.exports = function(artists) {
    const el = {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: []
    };

    for (var i = 0; i < artists.length; i++) {
        el.children.push({
            tagName: 'div',
            className: 'l-thumbnail-grid__item',
            childNodes: [
                artistThumbnail(artists[i])
            ]
        })
    }

    return el;
};
