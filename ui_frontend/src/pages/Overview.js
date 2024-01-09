import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {DataCollectorRequest} from '../actions/authActions';
import generateList from '../components/List';
import generateBarChart from '../components/BarChart';
import generateBarList from '../components/BarList';
import generateDonut from '../components/DonutChart';
import generateCard from '../components/Cart';
import generateProgressCircle from '../components/ProgressCircle';
import { Flex } from "@tremor/react";



const UserInfo = () => {
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
      <div className='plots'>

      <Flex justifyContent="center" alignItems="center">
      {display && <img src={user_data.image} style={{ width: '150px', height: '150px', marginRight: '2%' }} />}
        {display && generateList({ data: user_data })}
      </Flex>

        </div>
    </div>
    
    
  );

};

export default UserInfo;
