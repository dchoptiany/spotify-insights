import React, { useState, useEffect } from 'react';
import generateTextCard from '../components/recommendationCart';
import { Flex } from "@tremor/react";
import {DataCollectorRequest} from '../actions/authActions';
import AudioPlayer from './AudioPlayer';


//Recommendation page
const Recommendations = () => {
  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({
    tracks: []
  });

  let requestData=""


  const shouldLog = useRef(true);

  const getData = async () => {
    try {
     
      const parsedSpotifyURL = "http://aws_hostname:8080/spotify-api/user/recommendations";
      console.log(parsedSpotifyURL);

      const response = await DataCollectorRequest(parsedSpotifyURL);
      const data = await response.text();
      const requestData = JSON.parse(data);

      setUserData(requestData);
      setDisplay(true);
      
    } catch (error) {
      console.error('Błąd podczas zapytania:', error);
    }
  };

//Sending request and collecting recieved data
useEffect(() => {
  if (shouldLog.current) {
    shouldLog.current = false;
    getData(); 
  }

}, []);


  return (
    <div className="input-form-container">
        <div style={{paddingTop:"4%"}}>
            {userData.tracks.map((artist, index) => (
              <div className='recommendations' key={index}>
                <Flex justifyContent="center" alignItems="center" className='cartRec' >
                <img src={artist.album_image} alt={artist.name} style={{ width: '70px', height: '70px', marginRight: '2%' }} />
                {display && generateTextCard(artist.name, artist.artist_name,artist.album_name)}

                </Flex>
                <Flex justifyContent="center" alignItems="center" className='cart' >

                <AudioPlayer previewUrl={artist.preview_url} />
                </Flex>


              </div>
            ))}
            </div>
      </div>
  );
};

export default Recommendations;