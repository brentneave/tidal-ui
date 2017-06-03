const actions = require('./actions');



const hist = function(state) {

    console.log('hist', state);

    if (state.path.str != location.pathname) {
        history.pushState(null, null, state.path.str);
    }

    window.onpopstate = function() {
        actions(state).route(location.pathname);
    }

    return state;

}



module.exports = hist;
