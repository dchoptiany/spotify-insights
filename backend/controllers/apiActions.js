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
  console.log(jsonData)
  return axios.get(apiEndpoint,{  
  headers:{
    'Content-Type': 'application/json',
    "Access-Control-Allow-Credentials": true,
  },
  body:{jsonData}  
  })
  .then(response => response.data);
}   


module.exports = { makeSpotifyApiRequest, dataCollectorAction };
