const artistThumb = function(state, { artist }, actions) {

    const _getImgSrc = function(serial, w, h) {
        if (!serial) return undefined;
        if (!w) w = 640;
        if (!h) h = 428;
        //http://resources.tidal.com/images/14e5fcd9/25fc/4d61/9c3f/8f88770a8188/640x428.jpg
        return 'http://resources.tidal.com/images/' + serial.split('-').join('/') + '/' + w + 'x' + h + '.jpg';
    }

    return {
        tagName: 'a',
        className: 'c-thumbnail',
        attributes: {
            href: '/artist/' + artist.id
        },
        on: {
            click: actions.link
        },
        childNodes: [{

            tagName: 'img',
            className: 'c-thumbnail__img',
            attributes: artist.picture ? {
                src: _getImgSrc(artist.picture)
            } : null

        }, {

            tagName: 'p',
            textContent: artist.name

        }]
    };

};



module.exports = artistThumb;
