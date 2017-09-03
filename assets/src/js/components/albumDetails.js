const
    albumImage = require('./albumImage'),
    trackList = require('./trackList'),
    albumList = require('./albumList'),
    sectionHeader = require('./sectionHeader');



const albumDetails = function({ props, actions }) {

    console.log('albumDetails', ...arguments);

    const { details, tracks, similar } = props;

    return {
        tagName: 'div',
        className: 'mw9 center',
        childNodes: [{
                tagName: 'div',
                className: 'fixed left-0 top-0 mt7 right-0 o-30 z0',
                attributes: {
                    style: 'filter: blur(96px); pointer-events: none;'
                },
                childNodes: albumImage({
                    props: {
                        album: details,
                        width: 640
                    }
                })

            },
            {
                tagName: 'div',
                className: 'flex flex-wrap flex-row pv4 pv5-l ph3 ph4-l z1 relative',
                childNodes: [

                    {
                        /* album image */
                        tagName: 'div',
                        className: 'w-100 w-50-l ph3 ph4-l',
                        childNodes: albumImage({
                            props: { album: details, width: 1280 },
                            actions
                        })
                    },

                    {
                        tagName: 'div',
                        className: 'w-100 w-50-l pt3 pt0-l ph3 ph4-l',
                        childNodes: [{
                                /* album title */
                                tagName: 'h1',
                                className: 'f3 f2-ns lh-title antialiased legibility',
                                childNodes: [{
                                    tagName: 'span',
                                    className: 'db',
                                    textContent: details && details.title ? details.title : '_'
                                }, details && details.artist ? {
                                    tagName: 'a',
                                    className: 'db gray no-underline',
                                    textContent: details.artist.name,
                                    attributes: { href: '/artist/' + details.artist.id },
                                    on: { click: actions.link }
                                } : null]
                            },
                            /* tracklist */
                            tracks && tracks.length ? trackList({
                                props: { tracks },
                                actions
                            }) : null,
                        ]
                    }

                ]

            },

            similar && similar.length ? sectionHeader({
                props: { title: 'Similar Albums' }
            }) : null,

            similar && similar.length ? albumList({
                props: { albums: similar },
                actions
            }) : null

        ]
    }







    // return {
    //     tagName: 'div',
    //     childNodes: [
    //         details ? {
    //             tagName: 'h1',
    //             textContent: details.title
    //         } : null,
    //         details && details.artist ? {
    //             tagName: 'p',
    //             childNodes: {
    //                 tagName: 'a',
    //                 textContent: details.artist.name,
    //                 attributes: { href: '/artist/' + details.artist.id },
    //                 on: { click: actions.link }
    //             }
    //         } : null,
    //         details ? albumImage({
    //             state,
    //             props: { album: details, width: 1280 },
    //             actions
    //         }) : null,
    //         tracks && tracks.length ? trackList({
    //             state,
    //             props: { tracks },
    //             actions
    //         }) : null,
    //         similar && similar.length ? {
    //             tagName: 'h2',
    //             textContent: 'Similar Albums'
    //         } : null,
    //         similar && similar.length ? albumList({
    //             state,
    //             props: { albums: similar },
    //             actions
    //         }) : null
    //     ]
    // }

}



module.exports = albumDetails;



/*
details: {
    "id": 73881273,
    "title": "The Witch",
    "duration": 3295,
    "streamReady": true,
    "streamStartDate": "2017-05-19T00:00:00.000+0000",
    "allowStreaming": true,
    "premiumStreamingOnly": false,
    "numberOfTracks": 10,
    "numberOfVideos": 0,
    "numberOfVolumes": 1,
    "releaseDate": "2017-05-19",
    "copyright": "© 2017 Fiction Records, a division of Universal Music Operations Limited.",
    "type": "ALBUM",
    "version": null,
    "url": "http://www.tidal.com/album/73881273",
    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d",
    "videoCover": null,
    "explicit": false,
    "upc": "00602557449181",
    "popularity": 87,
    "audioQuality": "LOSSLESS",
    "artist": {
        "id": 7222513,
        "name": "Pumarosa",
        "type": "MAIN"
    },
    "artists": [
        {
            "id": 7222513,
            "name": "Pumarosa",
            "type": "MAIN"
        }
    ]
}, tracks: [
        {
            "item": {
                "id": 73881274,
                "title": "Dragonfly",
                "duration": 281,
                "replayGain": -7.96,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 1,
                "volumeNumber": 1,
                "version": null,
                "popularity": 49,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881274",
                "isrc": "GBUM71700591",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881275,
                "title": "Honey",
                "duration": 298,
                "replayGain": -10.65,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 2,
                "volumeNumber": 1,
                "version": null,
                "popularity": 48,
                "copyright": "℗ 2016 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881275",
                "isrc": "GBUM71604423",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881276,
                "title": "The Witch",
                "duration": 397,
                "replayGain": -8.42,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 3,
                "volumeNumber": 1,
                "version": null,
                "popularity": 49,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881276",
                "isrc": "GBUM71700541",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881277,
                "title": "Priestess",
                "duration": 450,
                "replayGain": -9.66,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 4,
                "volumeNumber": 1,
                "version": null,
                "popularity": 45,
                "copyright": "℗ 2015 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881277",
                "isrc": "GBUM71606873",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881278,
                "title": "Lions’ Den",
                "duration": 352,
                "replayGain": -7.66,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 5,
                "volumeNumber": 1,
                "version": null,
                "popularity": 46,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881278",
                "isrc": "GBUM71700542",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881279,
                "title": "My Gruesome Loving Friend",
                "duration": 243,
                "replayGain": -9.31,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 6,
                "volumeNumber": 1,
                "version": null,
                "popularity": 45,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881279",
                "isrc": "GBUM71700073",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881280,
                "title": "Red",
                "duration": 371,
                "replayGain": -7.66,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 7,
                "volumeNumber": 1,
                "version": null,
                "popularity": 47,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881280",
                "isrc": "GBUM71700543",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881281,
                "title": "Barefoot",
                "duration": 261,
                "replayGain": -9.52,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 8,
                "volumeNumber": 1,
                "version": null,
                "popularity": 42,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881281",
                "isrc": "GBUM71700540",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881282,
                "title": "Hollywood",
                "duration": 239,
                "replayGain": -8.15,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 9,
                "volumeNumber": 1,
                "version": null,
                "popularity": 47,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881282",
                "isrc": "GBUM71700544",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        },
        {
            "item": {
                "id": 73881283,
                "title": "Snake",
                "duration": 398,
                "replayGain": -9.82,
                "peak": 0.999969,
                "allowStreaming": true,
                "streamReady": true,
                "streamStartDate": "2017-05-19T00:00:00.000+0000",
                "premiumStreamingOnly": false,
                "trackNumber": 10,
                "volumeNumber": 1,
                "version": null,
                "popularity": 46,
                "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
                "url": "http://www.tidal.com/track/73881283",
                "isrc": "GBUM71700545",
                "editable": false,
                "explicit": false,
                "audioQuality": "LOSSLESS",
                "artist": {
                    "id": 7222513,
                    "name": "Pumarosa",
                    "type": "MAIN"
                },
                "artists": [
                    {
                        "id": 7222513,
                        "name": "Pumarosa",
                        "type": "MAIN"
                    }
                ],
                "album": {
                    "id": 73881273,
                    "title": "The Witch",
                    "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
                }
            },
            "type": "track"
        }
    ]

*/
