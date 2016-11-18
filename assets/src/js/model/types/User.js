const Model = require('../Model');

function User (id) {

  Model.prototype.constructor.call(this);

  if(!id) {
    throw new Error();
  }

  const _id = id;

  var _username,
      _firstName,
      _lastName,
      _email,
      _created,
      _picture,
      _newsletter,
      _gender,
      _dateOfBirth,
      _facebookUid;

  Object.defineProperty(this, 'id', {
    get: function() {
      return _id;
    }
  });

  Object.defineProperty(this, 'username', {
    get: function() {
      return _username;
    },
    set: function(s) {
      _username = s;
    }
  });

  Object.defineProperty(this, 'firstName', {
    get: function() {
      return _firstName;
    },
    set: function(s) {
      _firstName = s;
    }
  });

  Object.defineProperty(this, 'lastName', {
    get: function() {
      return _lastName;
    },
    set: function(s) {
      _lastName = s;
    }
  });

  Object.defineProperty(this, 'email', {
    get: function() {
      return _email;
    },
    set: function(s) {
      _email = s;
    }
  });

  Object.defineProperty(this, 'created', {
    get: function() {
      return _created;
    },
    set: function(s) {
      _created = s;
    }
  });

  Object.defineProperty(this, 'newsletter', {
    get: function() {
      return _newsletter;
    },
    set: function(s) {
      _newsletter = s;
    }
  });

  Object.defineProperty(this, 'gender', {
    get: function() {
      return _gender;
    },
    set: function(s) {
      _gender = s;
    }
  });

  Object.defineProperty(this, 'dateOfBirth', {
    get: function() {
      return _dateOfBirth;
    },
    set: function(s) {
      _dateOfBirth = s;
    }
  });

}

User.prototype = new Model();

module.exports = User;
