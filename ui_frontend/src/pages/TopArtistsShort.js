import React, { useState, useEffect } from 'react';
import generateTextCard from '../components/TextCart';
import { Flex } from "@tremor/react";
import {DataCollectorRequest} from '../actions/authActions';

const TopArtistsShort = () => {
  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({
    artists: [
    ]
  });

  let requestData=""


  const getData =  () => {

    try {
        const parsedSpotifyURL = "http://aws_hostname:8080/spotify-api/user/top/artists?time_range=short_term"
        console.log(parsedSpotifyURL)
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => {
          console.log(response)
          return response.text();
        }) 
        .then(data => {
          requestData = JSON.parse(data);
          console.log(requestData);
 
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



  useEffect(() => {
    getData();
  }, []);

  //  const readFromFile = async () => {
//    try {
//
//      setUserData(user_data);
//      setDisplay(true);
//    } catch (error) {
//      console.error('Błąd odczytu pliku:', error);
//    }
//  };

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
