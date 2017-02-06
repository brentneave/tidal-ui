const Utils = require('../../utils/Utils.js'),
      artistList = require('./artistList'),
      albumList = require('./albumList');

module.exports = function(state)
{
    const path = Utils.pathToArray(state.route.path),
          data = state.route.data;

    switch (path[0])
    {
        case 'favorites':
            switch (path[1])
            {
                case 'artists':
                    return artistList(state.route.data);
                    break;
                default:
                    breakl
            }
            break;
        case 'recommended':
            return albumList(state.route.data);
            break;
        default:
            break;
    }
}
