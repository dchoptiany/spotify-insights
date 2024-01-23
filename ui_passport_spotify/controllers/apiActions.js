//Module for making Spotify API requests
const axios = require('axios');

//Makes a Spotify API request with the provided endpoint and access token
function makeSpotifyApiRequest(apiEndpoint, accessToken) {
    return axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data);
  }


//Performs a data collection action with the provided API endpoint and JSON data
function dataCollectorAction(apiEndpoint,jsonData){
  return axios({
    method: 'get',
    url: apiEndpoint,  
    headers:{
      'Content-Type': 'application/json',
      "Access-Control-Allow-Credentials": true,
    },
    data: jsonData  
  })
  .then(response => response.data);
}   


module.exports = { makeSpotifyApiRequest, dataCollectorAction };
