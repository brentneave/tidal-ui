const APIRequest = require('../APIRequest'),
      APIConfig = require('../APIConfig'),
      APIActions = require('../APIActions'),
      Session = require('../../model/types/Session'),
      User = require('../../model/types/User');

const Artists = function() {
    APIRequest.prototype.constructor.call(this);
    this.method = APIRequest.method.get;
    this.responseAction = APIActions.RESPONSE_ARTISTS;
    this.errorAction = APIActions.ERROR_ARTISTS;
}

Artists.prototype = new APIRequest();

module.exports = new Artists();
