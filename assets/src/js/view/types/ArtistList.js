const
    ArtistThumbnail = require('./ArtistThumbnail');

const ArtistList = function()
{

    const _render = function(artists)
    {
        const el =
        {
            tag: 'div',
            className: 'l-thumbnail-grid',
            children: []
        };

        for (var i=0; i < artists.length; i++)
        {
            el.children.push
            (
                {
                    tag: 'div',
                    className: 'l-thumbnail-grid__item',
                    children:
                    [
                        ArtistThumbnail.render(artists[i])
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

module.exports = new ArtistList();
