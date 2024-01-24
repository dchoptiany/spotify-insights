import React, { useState, useEffect } from 'react';
import generateTextCard from '../components/TextCart';
import { Flex } from "@tremor/react";
import {DataCollectorRequest} from '../actions/authActions';

//Top artists page
const TopArtistsShort = ({term}) => {
  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({
    artists: [
    ]
  });

  let requestData=""

//Sending requests and collecting data
  const getData =  () => {
    try {
        const parsedSpotifyURL = `http://aws_hostname:8080/spotify-api/user/top/artists?time_range=${term}`
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => {
          return response.text();
        }) 
        .then(data => {
          requestData = JSON.parse(data); 
          setUserData(requestData);
          setDisplay(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error('Błąd podczas zapytania:', error);
    }
  
 }


 //Fetches data when the component "mounts"
  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="input-form-container">
        <div className='userInfo'>
            {userData.artists.map((artist, index) => (
              <div key={index}>
                <Flex justifyContent="center" alignItems="center" className='cart' >
                <img src={artist.image} alt={artist.name} style={{ width: '70px', height: '70px', marginRight: '5%' }} />
                {display && generateTextCard(artist.name, artist.genre)}
                </Flex>

              </div>
            ))}
      </div>
    </div>
  );
};

export default TopArtistsShort;
