const trackList = function({ state, props, actions }) {

    console.log('trackList', ...arguments);

    if (!props.tracks) return { tagName: 'div' }

    return {
        tagName: 'ol',
        className: 'pl0 list',
        childNodes: props.tracks.map(track => ({
            tagName: 'li',
            className: 'f6 pv2 bb b--dark-gray',
            textContent: track.item.title
        }))
    }

}



module.exports = trackList;



// tracks: [
//         {
//             "item": {
//                 "id": 73881274,
//                 "title": "Dragonfly",
//                 "duration": 281,
//                 "replayGain": -7.96,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 1,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 49,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881274",
//                 "isrc": "GBUM71700591",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881275,
//                 "title": "Honey",
//                 "duration": 298,
//                 "replayGain": -10.65,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 2,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 48,
//                 "copyright": "℗ 2016 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881275",
//                 "isrc": "GBUM71604423",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881276,
//                 "title": "The Witch",
//                 "duration": 397,
//                 "replayGain": -8.42,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 3,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 49,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881276",
//                 "isrc": "GBUM71700541",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881277,
//                 "title": "Priestess",
//                 "duration": 450,
//                 "replayGain": -9.66,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 4,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 45,
//                 "copyright": "℗ 2015 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881277",
//                 "isrc": "GBUM71606873",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881278,
//                 "title": "Lions’ Den",
//                 "duration": 352,
//                 "replayGain": -7.66,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 5,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 46,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881278",
//                 "isrc": "GBUM71700542",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881279,
//                 "title": "My Gruesome Loving Friend",
//                 "duration": 243,
//                 "replayGain": -9.31,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 6,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 45,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881279",
//                 "isrc": "GBUM71700073",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881280,
//                 "title": "Red",
//                 "duration": 371,
//                 "replayGain": -7.66,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 7,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 47,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881280",
//                 "isrc": "GBUM71700543",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881281,
//                 "title": "Barefoot",
//                 "duration": 261,
//                 "replayGain": -9.52,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 8,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 42,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881281",
//                 "isrc": "GBUM71700540",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881282,
//                 "title": "Hollywood",
//                 "duration": 239,
//                 "replayGain": -8.15,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 9,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 47,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881282",
//                 "isrc": "GBUM71700544",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         },
//         {
//             "item": {
//                 "id": 73881283,
//                 "title": "Snake",
//                 "duration": 398,
//                 "replayGain": -9.82,
//                 "peak": 0.999969,
//                 "allowStreaming": true,
//                 "streamReady": true,
//                 "streamStartDate": "2017-05-19T00:00:00.000+0000",
//                 "premiumStreamingOnly": false,
//                 "trackNumber": 10,
//                 "volumeNumber": 1,
//                 "version": null,
//                 "popularity": 46,
//                 "copyright": "℗ 2017 Fiction Records, a division of Universal Music Operations Limited.",
//                 "url": "http://www.tidal.com/track/73881283",
//                 "isrc": "GBUM71700545",
//                 "editable": false,
//                 "explicit": false,
//                 "audioQuality": "LOSSLESS",
//                 "artist": {
//                     "id": 7222513,
//                     "name": "Pumarosa",
//                     "type": "MAIN"
//                 },
//                 "artists": [
//                     {
//                         "id": 7222513,
//                         "name": "Pumarosa",
//                         "type": "MAIN"
//                     }
//                 ],
//                 "album": {
//                     "id": 73881273,
//                     "title": "The Witch",
//                     "cover": "636578d5-beeb-4268-88a2-d6b2dc6d577d"
//                 }
//             },
//             "type": "track"
//         }
//     ]
