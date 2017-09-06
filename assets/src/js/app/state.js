module.exports = {
    default: {
        session: {
            id: null,
            countryCode: null,
            loginError: null,
            user: {
                id: null
            }
        },
        path: {
            str: '/',
            arr: []
        },
        errors: null,
        route: {
            fresh: false,
            data: {}
        },
        audio: {
            quality: 'LOSSLESS',
            streamingDetails: {}
        },
        cache: {},
        data: {
            fresh: false,
            artists: {},
            albums: {},
            favorites: {
                artists: [],
                albums: []
            },
            latest: {
                albums: []
            },
            recommended: {
                artists: [],
                albums: []
            }
        }
    }
};