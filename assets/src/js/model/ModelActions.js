const ModelActions = Object.freeze({
    requests: Object.freeze
    (
        {
            GET_LOGIN                : 'MODEL_GET_LOGIN',
            GET_ARTISTS              : 'MODEL_GET_ARTISTS',
            GET_LATEST_RELEASES      : 'MODEL_GET_LATEST_RELEASES',
            GET_RECOMMENDED_ARTISTS  : 'MODEL_GET_RECOMMENDED_ARTISTS'
        }
    ),
    notifications: Object.freeze
    (
        {
            INITIALISE                   : 'MODEL_INITIALISE',
            STATE_CHANGE                 : 'STATE_CHANGE',
            LOGIN_RESPONSE               : 'MODEL_LOGIN_RESPONSE',
            LOGIN_ERROR                  : 'MODEL_LOGIN_ERROR',
            ARTISTS_RESPONSE             : 'MODEL_ARTISTS_RESPONSE',
            ARTISTS_ERROR                : 'MODEL_ARTISTS_ERROR',
            LATEST_RELEASES_RESPONSE     : 'MODEL_LATEST_RELEASES_RESPONSE',
            LATEST_RELEASES_ERROR        : 'MODEL_LATEST_RELEASES_ERROR',
            RECOMMENDED_ARTISTS_RESPONSE : 'MODEL_RECOMMENDED_ARTISTS_RESPONSE',
            RECOMMENDED_ARTISTS_ERROR    : 'MODEL_RECOMMENDED_ARTISTS_ERROR'
        }
    )
});

module.exports = ModelActions;
