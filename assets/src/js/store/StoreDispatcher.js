const Dispatcher = require('../dispatch/Dispatcher')

const StoreDispatcher = Object.freeze({
  login: new Dispatcher(StoreDispatcher),
  user: new Dispatcher(StoreDispatcher)
});

module.exports = StoreDispatcher;