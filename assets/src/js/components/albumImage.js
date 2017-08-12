/*
 * Tidal serves up artist images at a maximum width and only
 * at a very specific aspect ratio, so we constrain the size of the image
 */



const _src = function({ cover, width }) {

    if (!cover) return '';

    const size = _constrain({ width });

    return 'http://resources.tidal.com/images/' +
        cover.split('-').join('/') + '/' +
        size.width + 'x' +
        size.height + '.jpg';
}



const _constrain = function({ width }) {

    return { width, height: width }

}



const albumImage = function({ state, props, actions }) {

    const { album, width } = props;

    return {
        tagName: 'div',
        className: 'aspect-ratio aspect-ratio--1x1 overflow-hidden bg-dark-gray br1',
        childNodes: album && album.cover ? {
            tagName: 'img',
            className: 'db absolute w-100 h-auto',
            attributes: {
                src: _src({
                    cover: album.cover,
                    width: width
                }),
                alt: ''
            }
        } : null
    }
}



module.exports = albumImage;
