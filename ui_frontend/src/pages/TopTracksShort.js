import React, { useState, useEffect } from 'react';
import generateTextCard from '../components/TopTracksCart';
import { Flex } from "@tremor/react";
import {DataCollectorRequest} from '../actions/authActions';
import AudioPlayer from './AudioPlayer';

const TopTracksShort = ({term}) => {
  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({
    tracks: [
      // Your array of artists here
    ]
  });
  let requestData=""

  const getData =  () => {

    try {
        const parsedSpotifyURL = `http://aws_hostname:8080/spotify-api/user/top/tracks?time_range=${term}`
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
//
//  useEffect(() => {
//    readFromFile();
//  }, []);

  return (
    <div className="input-form-container">
        <div className='userInfo'>
            {userData.tracks.map((artist, index) => (
              <div className='topTracks' key={index}>
                <Flex justifyContent="center" alignItems="center" className='cart' >
                <img src={artist.album_image} alt={artist.name} style={{ width: '70px', height: '70px', marginRight: '5%' }} />
                {display && generateTextCard(artist.name, artist.artists_name,artist.album_name)}

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

export default TopTracksShort;
