import React, { useState, useEffect } from 'react';
import { Flex } from "@tremor/react";
import { DataCollectorRequest } from '../actions/authActions';
import generateDonut from '../components/DonutChart';
import generateCard from '../components/Cart';





const LikedTracks = () => {
    const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({});

    let requestData=""

    const getData =  () => {

        try {
            const parsedSpotifyURL = `http://aws_hostname:6060/user/analyse`
            console.log(parsedSpotifyURL)
            DataCollectorRequest(parsedSpotifyURL)
            .then(response => {
              console.log(response)
              return response.text();
            }) 
            .then(data => {
                const cleanedData = data.replace(/"/g, '');
                requestData = JSON.parse(atob(cleanedData));
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
      <div className="plots">
        <div style={{padding:"3%"}}></div>

      <Flex justifyContent="center" alignItems="center">

        {display && generateCard({data: userData.tracks_count, text: "Tracks count"}) }
        {display && generateCard({data: userData.artists_count, text: "Artists count"}) }
        </Flex>

        <Flex justifyContent="center" alignItems="center">

        {display && generateCard({data: userData.genres_count, text: "Genres count"}) }
        {display && generateCard({data: userData.uniqueness, text: "Uniquness"}) }
      </Flex>
      

        <Flex justifyContent="center" alignItems="center">

        {display && generateDonut({data: userData.top_genres, text: "Genres"})}
        {display && generateDonut({data: userData.top_decades, text: "Decades"})}
        </Flex>

        <Flex justifyContent="center" alignItems="center">

        {display && generateDonut({data: userData.top_artists, text: "Number of songs made by top 5 artist"})}
        </Flex>

        </div>
    </div>
    
    
  );


};

export default LikedTracks;
