const routes = require('./routes');



const load = function(state) {

    return routes.get(state).load ?
        routes.get(state).load(state) :
        state;

}



module.exports = load;
