import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {DataCollectorRequest} from '../actions/authActions';
import generateList from '../components/List';
import generateBarChart from '../components/BarChart';
import generateDonut from '../components/DonutChart';
import generateCard from '../components/Cart';
import generateProgressCircle from '../components/ProgressCircle';
import { Flex } from "@tremor/react";



const UrlAnalysis = () => {
  const [textInput, setTextInput] = useState('');
  const [display, setDisplay] = useState(false)
  const [arrayData, setArrayData] = useState({});
  const [playlistInfo, setPlaylistData] = useState({});
  const [url_data, setData] = useState({});
  const [url_data_user, setDataUser] = useState({});
  const [image, setImage ] = useState('');


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  let requestData = ""


  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  


function splitData(data) {
  let arrayData = {};

  for (const key in data) {
    if (key === "top_artists" || key === "top_genres") {
      arrayData[key] = data[key];
    }
  }
 setArrayData(arrayData);
}

function splitDataInfo(data) {
  let playlistInfo = {};

  for (const key in data) {
    if (key === "name" || key === "owner_name" || key === "desc") {
      playlistInfo[key] = data[key];
    }
  }
 setPlaylistData(playlistInfo)
 setImage(data.image)
}
  
  
  const handleButtonClick =  () => {

    try {
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = "http://aws_hostname:8080/spotify-api/"+spotifyAdressData[0]+"/info?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        console.log(parsedSpotifyURL)
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => {
          console.log(response)
          return response.text();
        }) 
        .then(data => {
          requestData = JSON.parse(data);
          console.log(requestData);
 
          setDataUser(requestData);
          splitDataInfo(requestData);
        })
        .catch(error => {
          console.log(error);
        });
    }else{
      setDisplay(false)
    }
    } catch (error) {
      console.error('Błąd podczas zapytania:', error);
    }

   try {
     const spotifyAdressData = parseSpotifyUrl(textInput);
     if(spotifyAdressData!=null){
       const parsedSpotifyURL = "http://aws_hostname:6060/"+spotifyAdressData[0]+"/analyse?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
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

         setData(requestData);
         splitData(requestData);
         setDisplay(true);
       })
       .catch(error => {
         console.log(error);
       });
   }else{
     setDisplay(false)
   }
   } catch (error) {
     console.error('Błąd podczas zapytania:', error);
   }
 
}



  return (
    <div className="input-form-container">
      <Flex justifyContent="center" alignItems="center" width="50%">
      <div>
        <div className='url_desc'> Analyze any Spotify playlist!</div>
        <div className='url_desc2'>See analysis of its top genres, artists,</div>
        <div className='url_desc2'> decades and more interesting statistics and facts.</div>
        <div className='url_desc3'>Enter link to your playlist, click Submit and enjoy!</div>
      </div>
      </Flex>
      <div className="input-container">
        <label>
          Link:
          <input className="input-field" type="text" value={textInput} onChange={handleInputChange} />
        </label>
        <Button onClick={handleButtonClick} text="Submit" />
        
      </div>
      <div className='plots'>

      <Flex justifyContent="center" alignItems="center">
      {display && <img src={image} style={{ width: '150px', height: '150px', marginRight: '2%' }} />}
        {display && generateList({ data: playlistInfo })}
      </Flex>
      <Flex justifyContent="center" alignItems="center">

        {display && generateCard({data: url_data.tracks_count, text: "Tracks count"}) }
        {display && generateCard({data: url_data.artists_count, text: "Artists count"}) }
        {display && generateCard({data: url_data.duration, text: "Duration"}) }
        {display && generateCard({data: url_data.uniqueness, text: "Uniquness"}) }
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {display && generateProgressCircle({data: url_data.general_energy, text:"Average energy"})}
        {display && generateProgressCircle({data: url_data.general_danceability, text:"Average danceability"})}
        {display && generateProgressCircle({data: url_data.uniqueness, text:"Uniquness"})}
        </Flex>
        <Flex justifyContent="center" alignItems="center">

        {display && Object.keys(arrayData).map((category) => (
          generateBarChart({
            data: arrayData[category],
            category: category,
            category_name: category,
          })
        ))}
        </Flex>

        <Flex justifyContent="center" alignItems="center">

        {display && generateDonut({data: url_data.top_genres, text: "Genres"})}
        {display && generateDonut({data: url_data.top_decades, text: "Decades"})}
        </Flex>

        </div>
    </div>
    
    
  );

};

export default UrlAnalysis;
