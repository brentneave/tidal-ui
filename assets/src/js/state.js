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
        current: {
            artist: {
                details: null,
                albums: null,
                similar: null
            },
            album: null
        },
        favorites: {
            artists: null,
            albums: null
        },
        latest: {
            albums: null
        },
        recommended: {
            artists: null,
            albums: null
        }
    }
};
