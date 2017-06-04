/*

    1. create a new state from an action and payload
    2. update browser history
    3. render ui
    4. write state to local storage
    5. fetch data required for current route, if any, create new state with that data
    6. once data fetched, update again with new data

*/

const update = function({ action, payload }) {
    console.log('update', ...arguments);
    reduce({ action, payload })
        .then(hist) // 2
        .then(render) // 3
        .then(write) // 4
        .then(load) // 5
        .then(update)
}



module.exports = update;



const
    reduce = require('./reduce'),
    hist = require('./hist'),
    render = require('./render'),
    load = require('./load'),
    write = require('./local').write;
