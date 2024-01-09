import React, { useState, useEffect } from 'react';
import {DataCollectorRequest} from '../actions/authActions';
import generateList from '../components/List';
import { Flex } from "@tremor/react";
import generateCard from '../components/Cart';



const UserInfo = ({user}) => {
  const [display, setDisplay] = useState(false)
  const [user_data, setData] = useState({});


let requestData=""
  
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

useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="input-form-container">
    <div className='userInfo'>
      <div className='plots'>
      <Flex justifyContent="center" alignItems="center">
      {display && <img src={user_data.image} style={{ width: '70px', height: '70px', marginBottom: '2%' }} />}
      </Flex>
      <Flex justifyContent="center" alignItems="center">
      {display && generateCard(user_data.name, "Name")}
      {display && generateCard(user_data.name, "Number of followers")}
      {display && generateCard(user_data.name, "Number of following artists")}
      </Flex>
      </div>

        </div>
    </div>
    
    
  );


};

export default UserInfo;
