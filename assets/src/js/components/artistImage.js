/*
 * Tidal serves up artist images at a maximum width and only
 * at a very specific aspect ratio, so we constrain the size of the image
 */



const _src = function({ picture, width, height }) {

    if (!picture) return '';

    const size = _constrain({ width, height });

    return 'http://resources.tidal.com/images/' +
        picture.split('-').join('/') + '/' +
        size.width + 'x' +
        size.height + '.jpg';
}



const _constrain = function({ width, height }) {

    const
        max = 640,
        ratio = (428 / 640);

    width = Math.round(Math.min(max, width || max));
    height = Math.round(width * ratio);

    return { width, height }

}



const artistImage = function({ state, props, actions }) {

    var { artist, width, height } = props;

    return {
        tagName: 'img',
        attributes: {
            src: _src({
                picture: artist.picture,
                width: width,
                height: height
            }),
            alt: artist.name
        }
    }
}



module.exports = artistImage;
