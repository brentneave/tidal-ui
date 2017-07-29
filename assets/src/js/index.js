const
    local = require('./app/local'),
    update = require('./app/update');

update({
    action: 'INIT',
    payload: { localState: local.read() }
});
