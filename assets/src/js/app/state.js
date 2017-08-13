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
        cache: {},
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
