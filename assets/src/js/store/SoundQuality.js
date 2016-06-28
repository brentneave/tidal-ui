var SoundQuality = {}

Object.defineProperty(SoundQuality, 'lossless', {
  get: function() { return 'LOSSLESS'; }
});

Object.defineProperty(SoundQuality, 'high', {
  get: function() { return 'HIGH'; }
});

Object.defineProperty(SoundQuality, 'low', {
  get: function() { return 'LOW'; }
});

module.exports = SoundQuality;