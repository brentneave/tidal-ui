const Model = require('../Model'),
      Broadcaster = require('../../events/Broadcaster'),
      User = require('./User');

function Session() {

  Model.prototype.constructor.call(this);

  var _id = null,
      _user = null,
      _countryCode = null;

  Object.defineProperty(this, 'isLoggedIn', {
    get: function() {
      return _id != null;
    }
  });

  Object.defineProperty(this, 'id', {
    get: function() {
      return _id;
    },
    set: function(s) {
      _id = s;
      this.onChange.broadcast(this);
    }
  });

  Object.defineProperty(this, 'user', {
    get: function() {
      return _user;
    },
    set: function(o) {
      if(o instanceof User) {
        _user = o;
        this.onChange.broadcast(this);
      } else {
        throw new Error();
      }
    }
  });

  Object.defineProperty(this, 'countryCode', {
    get: function() {
      return _countryCode;
    },
    set: function(s) {
      _countryCode = s;
      this.onChange.broadcast(this);
    },
  });

}

Session.prototype = new Model();

module.exports = Session;
