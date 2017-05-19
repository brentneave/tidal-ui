const Utils = require('../../utils/Utils.js'),
    artistList = require('./artistList'),
    albumList = require('./albumList'),
    loadingIndicator = require('./loadingIndicator');

module.exports = function(state) {
    const path = Utils.pathToArray(state.route.path),
        data = state.route.data;

    if (!data || !data.length) {
        return loadingIndicator();
    } else {
        switch (path[0]) {
            case 'favorites':
                switch (path[1]) {
                    case 'artists':
                        return artistList(state.route.data);
                        break;
                    default:
                        break;
                }
                break;
            case 'recommended':
                switch (path[1]) {
                    case 'artists':
                        return artistList(state.route.data);
                        break;
                    case 'albums':
                        return albumList(state.route.data);
                        break;
                    default:
                        break;
                }
                break;
            default:
                return {
                    tagName: 'div'
                };
                break;
        }
    }
}
