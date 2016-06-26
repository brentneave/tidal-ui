var User = require('./User');

function Session(id, user, countryCode) {

  if(!id) {
    throw new Error('Session: Provide a valid id');
  }

  if(!(user instanceof User)) {
    throw new Error('Session: Provide a valid User');
  }

  if(countryCode !== countryCode.toString()) {
    throw new Error('Session: Provide a valid countryCode');
  }

  var _id = id,
      _user = user,
      _countryCode = countryCode;

  Object.defineProperty(this, 'id', {
    get: function() { return _id; }
  });

  Object.defineProperty(this, 'user', {
    get: function() { return _user; }
  });

  Object.defineProperty(this, 'countryCode', {
    get: function() { return _countryCode; }
  });
}

module.exports = Session;