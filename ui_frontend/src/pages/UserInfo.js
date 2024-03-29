import React, { useState, useEffect } from 'react';
import {DataCollectorRequest} from '../actions/authActions';
import generateList from '../components/List';
import { Flex } from "@tremor/react";
import generateTextCard from '../components/TextCart';


//User info page
const UserInfo = ({user}) => {
  const [display, setDisplay] = useState(false)
  const [user_data, setData] = useState({});


let requestData=""
  //Getting user data
  const getUserInfo =  () => {
 try {
     const parsedSpotifyURL = "http://aws_hostname:8080/spotify-api/user/info";
     console.log(parsedSpotifyURL)
     DataCollectorRequest(parsedSpotifyURL)
     .then(response => {
       console.log(response)
       return response.text();
     }) 
     .then(data => {
       requestData = JSON.parse(data);
       console.log(requestData);

        setData(requestData);
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
    getUserInfo();
  }, []);

  return (
    <div className="input-form-container">
      <div className='plots'>
    <div className='userInfo'>
      <Flex justifyContent="center" alignItems="center">
      {display && <img src={user_data.image} style={{ width: '70px', height: '70px', marginBottom: '5%' }} />}
      </Flex>
      <Flex justifyContent="center" alignItems="center">
      
      {display && generateTextCard(user_data.name, "Name")}
      {display && generateTextCard(user_data.num_of_followers, "Followers")}
      {display && generateTextCard(user_data.num_of_following_artists, "Followed artists")}
      </Flex>
      </div>

        </div>
    </div>
    
    
  );


};

export default UserInfo;
