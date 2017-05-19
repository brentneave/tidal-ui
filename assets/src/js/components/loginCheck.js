const loginForm = require('./loginForm');



const loginCheck = function({ state, props, actions }) {

    const content = props.content;

    console.log('state:', state);

    return state.session.id !== null ?
        content :
        loginForm({ state, props, actions });

}



module.exports = loginCheck;
