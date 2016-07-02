const APIConfig = Object.freeze({
  baseURL:
    'https://api.tidalhifi.com/v1',
  URLs:
    Object.freeze({
      login: 'https://api.tidalhifi.com/v1/login/username',
      user:  'https://api.tidalhifi.com/v1/users',
    }),
  token:
    '_KM2HixcUBZtmktH',
  tokenHeader:
    Object.freeze({
      'X-Tidal-Token': '_KM2HixcUBZtmktH'
    })
});

module.exports = APIConfig;
