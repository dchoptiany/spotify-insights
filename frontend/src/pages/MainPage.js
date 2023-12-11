import React, { useState } from 'react';
import Button from './../components/Button';
import {DataCollectorRequest} from './../actions/authActions';
import generateChart from './../components/DonutChart'
import generateList from '../components/ListComponent';
import generateBarChart from '../components/BarList';


const MainPage = ({user}) => {
  const [textInput, setTextInput] = useState('');
  const [display, setDisplay] = useState(false)


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };


  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  
  const data = {
    "artists_count": 2,
    "danceability": 61,
    "duration_s": 502,
    "energy": 81,
    "genres_count": 2,
    "top_artists": [
        [
            "200",
            2
        ],
        [
            "100",
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
    "uniqueness": 13
}


function splitData(data) {
  const objectData = {};
  const arrayData = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      arrayData[key] = data[key];
    } else {
      objectData[key] = data[key];
    }
  }

  return { objectData, arrayData };
}
  
  
  const handleButtonClick =  () => {
    try {
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = 'http://localhost:8080/spotify-api/'+spotifyAdressData[0]+"?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => response.json()) 
        .then(data => {
          console.log(data);
          setDisplay(true);
          console.log(display)

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
  };
  

  const {objectData, arrayData} = splitData(data)


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
        { generateList({ data: objectData })}
        {Object.keys(arrayData).map((category) => (
          generateBarChart({
            data: arrayData[category],
            category: category,
            category_name: category,
          })
        ))}
        </div>
    </div>
    
    
  );

};

export default MainPage;
