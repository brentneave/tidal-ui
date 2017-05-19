module.exports = {
    component: 'home',
    routes: {
        default: {
            component: 'home'
        },
        favorites: {
            component: 'favorites',
            routes: {
                artists: {
                    component: 'favoriteArtists'
                }
            }
        },
        recommended: {
            component: 'recommended'
        }
    }
}
