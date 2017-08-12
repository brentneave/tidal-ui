/*
 * Tidal serves up artist images at a maximum width and only
 * at a very specific aspect ratio, so we constrain the size of the image
 */



const _src = function({ picture, width }) {

    if (!picture) return '';

    return 'http://resources.tidal.com/images/' +
        picture.split('-').join('/') + '/' +
        '640x428.jpg';
}




const artistImage = function({ props, actions }) {

    var { artist, width } = props;

    return {
        tagName: 'div',
        className: 'aspect-ratio aspect-ratio--8x5 overflow-hidden bg-dark-gray',
        childNodes: {
            tagName: 'img',
            className: 'db absolute w-100 h-auto',
            attributes: {
                src: _src({
                    picture: artist.picture
                }),
                alt: ''
            }
        }
    }
}



module.exports = artistImage;
