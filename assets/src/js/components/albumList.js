const albumThumbnail = require('./albumThumbnail');

module.exports = function(albums) {
    const el = {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: []
    };

    for (var i = 0; i < albums.length; i++) {
        el.children.push({
            tagName: 'div',
            className: 'l-thumbnail-grid__item',
            childNodes: [
                albumThumbnail(albums[i])
            ]
        })
    }

    return el;
};
