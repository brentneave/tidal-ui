var FLAC = require('flac.js'),
    AV = require('av'),
    SoundQuality = require('./tidal/SoundQuality'),
    TidalAPI = require('./tidal/TidalAPI');

var tidal = new TidalAPI();
console.log('ready');
tidal.login('','');