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



const UrlAnalysis = () => {
  const [textInput, setTextInput] = useState('');
  const [display, setDisplay] = useState(false)
  const [arrayData, setArrayData] = useState({});
  const [playlistInfo, setPlaylistData] = useState({});
  const [data, setData] = useState({});


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  let requestData = ""


  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  
 let exampleData={
  "artists_count": 2,
  "description": "Sample playlist description",
  "duration": "0:08:22",
  "general_danceability": 61,
  "general_energy": 81,
  "genres_count": 2,
  "image": "https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg",
  "name": "My playlist",
  "owner": "Damian",
  "top_artists": [
      [
          "Artist 2",
          2
      ],
      [
          "Artist 1",
          1
      ]
  ],
  "top_decades": [
      [
          "2020'",
          2
      ],
      [
          "2000'",
          1
      ]
  ],
  "top_genres": [
      [
          "pop",
          2
      ],
      [
          "rap",
          1
      ]
  ],
  "tracks_count": 3,
  "tracks_danceability": [
      60,
      91,
      30
  ],
  "tracks_energy": [
      57,
      100,
      87
  ],
  "uniqueness": 1
}; 


function splitData(data) {
  let arrayData = {};
  let playlistInfo = {};

  for (const key in data) {
    if (key === "name" || key === "owner" || key === "description") {
      playlistInfo[key] = data[key];
    }
    if (key === "top_artists" || key === "top_genres") {
      arrayData[key] = data[key];
    }
  }
 setArrayData(arrayData);
 setPlaylistData(playlistInfo)
}
  
  
  const handleButtonClick =  () => {
    try {
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = "http://aws_hostname:8080/"+spotifyAdressData[0]+"/info?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        console.log(parsedSpotifyURL)
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => {
          console.log(response)
          return response.text()
        }) 
        .then(data => {
          const cleanedData = data.replace(/"/g, '');
          console.log(data)
          requestData = JSON.parse(atob(cleanedData));
          data = requestData;
          setData(data);
          setDisplay(true);
//
//
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





   // Run once after the component mounts
   useEffect(() => {
    // Call splitData when the component mounts
    splitData(data);
  }, []);
  
  return (
    <div className="input-form-container">
      <div className="input-container">
        <label>
          Link:
          <input className="input-field" type="text" value={textInput} onChange={handleInputChange} />
        </label>
        <Button onClick={handleButtonClick} text="Submit" />
        
      </div>
      <div className='plots'>

      <Flex justifyContent="center" alignItems="center">
      {display && <img src={data.image} style={{ width: '150px', height: '150px', marginRight: '2%' }} />}
        {display && generateList({ data: playlistInfo })}
      </Flex>
      <Flex justifyContent="center" alignItems="center">

        {display && generateCard({data: data.tracks_count, text: "Tracks count"}) }
        {display && generateCard({data: data.artists_count, text: "Artists count"}) }
        {display && generateCard({data: data.duration, text: "Duration"}) }
        {display && generateCard({data: data.uniqueness, text: "Uniquness"}) }
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {display && generateProgressCircle({data: data.general_energy, text:"Average energy"})}
        {display && generateProgressCircle({data: data.general_danceability, text:"Average danceability"})}
        {display && generateProgressCircle({data: data.uniqueness, text:"Uniquness"})}
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

        {display && generateDonut({data: data.top_genres, text: "Genres"})}
        {display && generateDonut({data: data.top_decades, text: "Decades"})}
        </Flex>

        </div>
    </div>
    
    
  );

};

export default UrlAnalysis;
