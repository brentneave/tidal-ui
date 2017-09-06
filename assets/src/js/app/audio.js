const
    av = require('av'),
    flac = require('flac.js');


var
    _currentTrack
    _player;


const _playTrack = function(track) {
    _player = AV.Player.fromURL('http://mysite.com/audio.wav');
}

const audio = function(state) {
    if(_currentTrack.id != state.audio.track.id) {
        _playTrack(track);
    }
    _currentTrack = clone(state.audio.track);
    return state;
}