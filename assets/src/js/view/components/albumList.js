const albumThumbnail = require('./albumThumbnail');

module.exports = function(albums)
{
    const el =
    {
        tag: 'div',
        className: 'l-thumbnail-grid',
        children: []
    };

    for (var i=0; i < albums.length; i++)
    {
        el.children.push
        (
            {
                tag: 'div',
                className: 'l-thumbnail-grid__item',
                children:
                [
                    albumThumbnail(albums[i])
                ]
            }
        )
    }

    return el;
};
