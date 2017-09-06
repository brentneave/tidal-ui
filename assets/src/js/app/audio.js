const
    AV = require('av'),
    flac = require('flac.js');



var
    _currentURL,
    _player;



const _playTrack = function(url) {
    console.log('audio._playTrack', url);
    _player = AV.Player.fromURL(url);
    _player.play();
    console.log('audio._playTrack', url, _player);
}



const audio = function(state) {
    console.log('audio', state);
    if(_currentURL != state.audio.streamingDetails.url) {
        _playTrack(state.audio.streamingDetails.url);
    }
    _currentURL = state.audio.streamingDetails.url;
    return state;
}



module.exports = audio;