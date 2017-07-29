/*
 * Tidal serves up artist images at a maximum width and only
 * at a very specific aspect ratio, so we constrain the size of the image
 */



const _src = function({ cover, width, height }) {

    if (!cover) return '';

    const size = _constrain({ width, height });

    return 'http://resources.tidal.com/images/' +
        cover.split('-').join('/') + '/' +
        size.width + 'x' +
        size.width + '.jpg';
}



const _constrain = function({ width, height }) {

    return { width, height }

}



const albumImage = function({ state, props, actions }) {

    const { album, width } = props;

    return {
        tagName: 'img',
        attributes: {
            src: _src({
                cover: album.cover,
                width: width
            }),
            alt: album.title
        }
    }
}



module.exports = albumImage;
