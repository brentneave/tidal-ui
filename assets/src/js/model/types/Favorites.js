const Album = require('./Album'),
      Session = require('./Session'),
      ListOf = require('../utils/ListOf'),
      APIConfig = require('../api/APIConfig'),
      APIRequest = require('../api/APIRequest');

const Favorites = function() {
  const _albums: new ListOf(Album);

  Object.defineProperty(this, 'albums', {
    get: function() {
      return _albums.instances;
    },
    set: funcion(a) {
      var i = a.length {
        while(i--) {
          _albums.add(a[i]);
        }
      }
    }
  })
}

// const Favorites = function() {
//
//   const _albums = new ListOf(Album);
//
//   const _handleAlbumLoad = function(o) {
//     console.log('loaded fave albums');
//     console.log(o);
//   }
//
//   const _handleAlbumError = function(o) {
//     console.log('error loading fave albums');
//     console.log(o);
//   }
//
//   const _loadAlbums = function() {
//     if(!Session.isLoggedIn) {
//       const request = new APIRequest(
//         APIConfig.URLs.favoriteAlbums(Session.user),
//         APIConfig.sessionHeader(Session),
//         { limit: 9999,
//           countryCode: Session.countryCode },
//         APIRequest.method.get
//       );
//       request.onResponse.addListener(this, _handleAlbumLoad);
//       request.onError.addListener(this, _handleAlbumError);
//       request.send();
//     }
//     else {
//       throw new Error();
//       return false;
//     }
//   };
//
//   Object.defineProperty(this, 'albums', {
//     get: function() {
//       return _albums;
//     }
//   });
//
//   Object.defineProperty(this, 'loadAlbums', {
//     get: function() {
//       return _loadAlbums;
//     }
//   });
//
// }

module.exports = Favorites;
