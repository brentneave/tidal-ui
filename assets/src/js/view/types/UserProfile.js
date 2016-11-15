const Action = require('../../events/Action'),
      View = require('../View'),
      ViewActions = require('../ViewActions'),
      Broadcaster = require('../../events/Broadcaster');

const UserProfile = function(parentNode) {

  View.prototype.constructor.call(this, parentNode);

}

UserProfile.prototype = new View();

UserProfile.prototype.onModelChange = UserProfile.prototype.render;

Object.defineProperty(UserProfile.prototype, 'structure', {
  get: function() {
    return {
      tag: 'div',
      className: 'user-profile',
      children: [{
        tag: 'p',
        text: model.firstName + ' ' + model.lastName
      }]
    }
  }
});


module.exports = UserProfile;
