
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

    module.exports = function(album)
    {
        const _getImgSrc = function(serial, w, h)
        {
            if(!w) w = 640;
            if(!h) h = 640;
            //http://resources.tidal.com/images/14e5fcd9/25fc/4d61/9c3f/8f88770a8188/640x428.jpg
            return 'http://resources.tidal.com/images/'+ serial.split('-').join('/') + '/' + w + 'x' + h + '.jpg';
        }

        const _artists = [];

        var i, n = album.artists.length;
        for(i=0; i<n; i++)
        {
            _artists.push(album.artists[i].name);
        }

        return {
            tag: 'div',
            className: 'c-thumbnail',
            children:
            [
                {
                    tag: 'img',
                    className: 'c-thumbnail__img',
                    attributes:
                    {
                        src: album.cover ? _getImgSrc(album.cover) : ""
                    }
                },
                {
                    tag: 'p',
                    text: album.title
                },
                {
                    tag: 'p',
                    text: _artists.join(', ')
                },
                {
                    tag: 'p',
                    text: album.streamStartDate.slice(0,10)
                }
            ]
        };
    };
