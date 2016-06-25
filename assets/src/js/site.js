var FLAC = require('flac.js'),
    AV = require('av'),
    SoundQuality = require('./tidal/SoundQuality'),
    Tidal = require('./tidal/Tidal');

var tidal = new Tidal();
console.log('ready');
tidal.login('','');