const artistThumbnail = require('./artistThumbnail');

module.exports = function(artists)
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
                    artistThumbnail(artists[i])
                ]
            }
        )
    }

    return el;
};
