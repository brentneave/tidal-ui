const Broadcaster = require('../events/Broadcaster'),
      ListOf = require('../utils/ListOf');

const Model = function() {
  Object.defineProperty(this, 'actions', {
    value: new Broadcaster()
  });
  Object.defineProperty(this, 'onChange', {
    value: new Broadcaster()
  });
  Model.instances.add(this);
};

Object.defineProperty(Model, 'instances', {
  value: new ListOf(Model)
});

module.exports = Model;
