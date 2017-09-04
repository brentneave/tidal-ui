/*
{
    allowStreaming: true
    artist:
    {
        id: 14760
        name: "Clint Mansell"
        type: "MAIN"
    }
    id: 14760
    name: "Clint Mansell"
    type: "MAIN"
    Object Prototype
    artists:
    [
        {id: 14760, name: "Clint Mansell", type: "MAIN"}
    ]
    copyright: "2007 Lakeshore Records"
    cover: "637d6b44-3bad-4041-b637-4e7827a35a25"
    duration: 2756
    explicit: false
    id: 66712590
    numberOfTracks: 8
    numberOfVideos: 0
    numberOfVolumes: 1
    popularity: 0
    premiumStreamingOnly: false
    releaseDate: "2016-11-18"
    streamReady: true
    streamStartDate: "2016-11-18T00:00:00.000+0000"
    title: "Smokin' Aces (Original Motion Picture Score)"
    type: "ALBUM"
    upc: "886446216898"
    url: "http://www.tidal.com/album/66712590"
    version: null
}
*/



const albumImage = require('./albumImage');



const albumThumb = function({ props, actions }) {

    const { album } = props;

    return {
        tagName: 'a',
        className: 'db no-underline',
        attributes: { href: '/album/' + album.id },
        on: { click: actions.link },
        childNodes: [

            {
                tagName: 'div',
                className: 'grow',
                childNodes: albumImage({
                    props: {
                        album,
                        width: 640
                    }
                })
            },

            {
                tagName: 'p',
                className: 'ma0 pt4 pb5 f6 bg-near-black',
                childNodes: [{
                        tagName: 'span',
                        className: 'db white',
                        textContent: album.title
                    },
                    album.artists ? {
                        tagName: 'span',
                        className: 'db light-silver',
                        textContent: album.artists.map((artist) => artist.name).join(', ')
                    } : null
                ]
            }
        ]
    }
};




module.exports = albumThumb;
