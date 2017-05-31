const
    state = require('./state'),
    local = require('./local'),
    update = require('./update');



update({
    action: 'INIT',
    state: state.default,
    payload: local.read()
});
