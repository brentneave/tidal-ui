module.exports = {
    session: {
        id: null,
        countryCode: null,
        loginError: null,
        user: {
            id: null
        }
    },
    route: {
        path: '/',
        component: 'home',
        data: null
    },
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
};
