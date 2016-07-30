const Action = function(type, payload) {
  Object.defineProperty(this, 'type', {value: String(type)});
  Object.defineProperty(this, 'payload', {value: payload});
}

module.exports = Action;
