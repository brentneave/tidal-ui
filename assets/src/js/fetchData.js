module.exports = function(path, state, remoteTransactionID) {

    const pathArray = Utils.pathToArray(path);

    var request;

    const success = function(response) {
        return {
            remoteTransactionID: remoteTransactionID,
            path: path,
            data: response
        }
    };

    const failure = function(error) {
        throw new Error(error);
    }

    switch (pathArray[0]) {
        case 'favorites':
            switch (pathArray[1]) {
                case 'artists':
                    request = API.loadFavoriteArtists(state.session);
                default:
                    break;
            }
            break;
        case 'recommended':
            switch (pathArray[1]) {
                case 'albums':
                    request = API.loadRecommendedAlbums(state.session);
                    break;
                case 'artists':
                    request = API.loadRecommendedArtists(state.session);
                    break;
                default:
                    break;
            }
        default:
            break;
    }

    return request.then(success).catch(failure);
}
