/*

    1. create a new state from an action and payload
    2. update browser history
    3. render ui
    4. write state to local storage
    5. fetch data required for current route, if any, create new state with that data
    6. once data fetched, update address bar, ui, and local storage once more with new state

*/


const update = function({ state, action, payload }) {
    reduce({ action, state, payload })
        .then(hist) // 2
        .then(render) // 3
        .then(write) // 4
        .then(load) // 5
        .then(hist) // 6
        .then(render) // 6
        .then(write); // 6
}



module.exports = update;



const
    reduce = require('./reduce'),
    hist = require('./hist'),
    render = require('./render'),
    load = require('./load'),
    write = require('./local').write;
