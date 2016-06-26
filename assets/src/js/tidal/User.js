function User (id) {

  if(!id) {
    throw new Error();
  }

  _id = id;

  Object.defineProperty(this, 'id', {
    get: function() { 
      return _id; 
    }
  });
}

module.exports = User;