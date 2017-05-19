const API = require('../api/API.js'),
    Utils = require('../utils/Utils.js');

module.exports = Object.freeze({
    setRoute: function(state, path) {
        console.log('Router.setRoute');
        console.log(path);
        console.log(state);

        history.pushState(state, null, path);

        path = Utils.pathToArray(path);

        switch (path[0]) {
            case 'favorites':
                switch (path[1]) {
                    case 'artists':
                        console.log(state.session.user.id);
                        return API.loadFavoriteArtists(state.session);
                    default:
                        break;
                }
                break;
            case 'recommended':
                switch (path[1]) {
                    case 'albums':
                        return API.loadRecommendedAlbums(state.session);
                        break;
                    case 'artists':
                        return API.loadRecommendedArtists(state.session);
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    },
    updateCurrentRoute: function(state) {
        history.replaceState(state, null, window.location.pathname);
        return state;
    }
});
