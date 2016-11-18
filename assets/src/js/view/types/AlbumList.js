const
    AlbumThumbnail = require('./AlbumThumbnail');

const AlbumList = function()
{

    const _render = function(albums)
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
                        AlbumThumbnail.render(albums[i])
                    ]
                }
            )
        }

        return el;
    };

    Object.defineProperty
    (
        this, 'render',
        {
            value: _render
        }
    );
}

module.exports = new AlbumList();
