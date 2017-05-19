const Actions = require('./Actions');



const AddressBar = function({ actions, popState }) {



    window.onpopstate = function(event) {
        actions.popState(event);
    }



    const _update = function(state) {

        const
            currentPath = window.location.pathname,
            newPath = state.route.path;

        if (currentPath === newPath) {
            history.replaceState(state, null, currentPath);
        } else {
            history.pushState(state, null, newPath);
        }

        return state;
    }



    return Object.freeze({
        update: _update
    });



}



module.exports = AddressBar;
