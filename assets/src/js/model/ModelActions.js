const ModelActions = Object.freeze({
    requests: Object.freeze
    (
        {

            GET_LOGIN                : 'MODEL_GET_LOGIN',
            GET_ARTISTS              : 'MODEL_GET_ARTISTS',
            GET_LATEST_RELEASES      : 'MODEL_GET_LATEST_RELEASES'
        }
    ),
    notifications: Object.freeze
    (
        {
            INITIALISE               : 'MODEL_INITIALISE',
            LOGIN_RESPONSE           : 'MODEL_LOGIN_RESPONSE',
            LOGIN_ERROR              : 'MODEL_LOGIN_ERROR',
            ARTISTS_RESPONSE         : 'MODEL_ARTISTS_RESPONSE',
            ARTISTS_ERROR            : 'MODEL_ARTISTS_ERROR',
            LATEST_RELEASES_RESPONSE : 'LATEST_RELEASES_RESPONSE',
            LATEST_RELEASES_ERROR    : 'LATEST_RELEASES_ERROR'
        }
    )
});

module.exports = ModelActions;


/*
{
    case ModelActions.LOGIN:
        new LoginRequest(action.payload.username, action.payload.password).send();
        break;

    case ModelActions.GET_ARTISTS:
        new ArtistsRequest(action.payload.session).send();
        break;

    case ModelActions.GET_LATEST_RELEASES:
        new LatestReleasesRequest(action.payload.artists, action.payload.session);
        break;

*/
