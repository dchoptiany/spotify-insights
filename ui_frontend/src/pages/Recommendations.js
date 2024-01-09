import React, { useState, useEffect } from 'react';
import generateTextCard from '../components/recommendationCart';
import { Flex } from "@tremor/react";
import {DataCollectorRequest} from '../actions/authActions';
import AudioPlayer from './AudioPlayer';

const Recommendations = () => {
  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({
    tracks: [
      // Your array of artists here
    ]
  });

  let requestData=""

  //const readFromFile = async () => {
  //  try {
//
  //    setUserData(user_data);
  //    setDisplay(true);
  //  } catch (error) {
  //    console.error('Błąd odczytu pliku:', error);
  //  }
  //};
//
  //useEffect(() => {
  //  readFromFile();
  //}, []);
//
const getData =  () => {

    try {
        const parsedSpotifyURL = "http://aws_hostname:8080/spotify-api/user/recommendations"
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


  return (
    <div className="input-form-container">
        <div style={{paddingTop:"4%"}}>
        

            {userData.tracks.map((artist, index) => (
              <div className='recommendations' key={index}>
                <Flex justifyContent="center" alignItems="center" className='cartRec' >
                <img src={artist.album_image} alt={artist.name} style={{ width: '70px', height: '70px', marginRight: '2%' }} />
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

export default Recommendations;
