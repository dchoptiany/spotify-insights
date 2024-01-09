import React, { useState, useEffect } from 'react';
import { Flex } from "@tremor/react";
import { DataCollectorRequest } from '../actions/authActions';





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
      <div className='tab'>

        </div>
    
    
  );


};

export default LikedTracks;
