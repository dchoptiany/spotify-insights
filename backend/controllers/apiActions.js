const axios = require('axios');


function makeSpotifyApiRequest(apiEndpoint, accessToken) {
    return axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data);
  }

function dataCollectorAction(apiEndpoint,jsonData){
  return axios.put(apiEndpoint,{  
  headers:{
    'Content-Type': 'application/json',
    "Access-Control-Allow-Credentials": true,
  },
  body:{Token: jsonData}  
  })
  .then(response => response.data);
}   


module.exports = { makeSpotifyApiRequest, dataCollectorAction };
