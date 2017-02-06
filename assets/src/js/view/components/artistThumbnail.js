/*
{
    id: 4502257,
    name: "The Haxan Cloak",
    url: "http://www.tidal.com/artist/4502257",
    picture: "14e5fcd9-25fc-4d61-9c3f-8f88770a8188",
    popularity: 14
}
*/

module.exports = function(artist)
{
    const _getImgSrc = function(serial, w, h)
    {
        if(!serial) return undefined;
        if(!w) w = 640;
        if(!h) h = 428;
        //http://resources.tidal.com/images/14e5fcd9/25fc/4d61/9c3f/8f88770a8188/640x428.jpg
        return 'http://resources.tidal.com/images/'+ serial.split('-').join('/') + '/' + w + 'x' + h + '.jpg';
    }

    return {
        tag: 'div',
        className: 'c-thumbnail',
        children: [
            {
                tag: 'img',
                className: 'c-thumbnail__img',
                attributes:
                {
                    src: artist.picture ? _getImgSrc(artist.picture) : ""
                }
            },
            {
                tag: 'p',
                text: artist.name
            }
        ]
    };
};
