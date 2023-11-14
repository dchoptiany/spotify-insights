const axios = require('axios');


function makeSpotifyApiRequest(apiEndpoint, accessToken) {
    return axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data);
  }


module.exports = makeSpotifyApiRequest