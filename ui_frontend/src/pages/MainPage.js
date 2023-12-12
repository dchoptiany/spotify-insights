import React, { useState } from 'react';
import Button from './../components/Button';
import {DataCollectorRequest} from './../actions/authActions';
import generateList from '../components/List';
import generateBarChart from '../components/BarChart';
import hostname from "../config/config.js"


const MainPage = ({user}) => {
  const [textInput, setTextInput] = useState('');
  const [display, setDisplay] = useState(false)


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const requestData = ""


  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  


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
        // 'http://localhost:8080/spotify-api/'
        const parsedSpotifyURL = "http://ec2-52-59-247-253.eu-central-1.compute.amazonaws.com:6060/"+spotifyAdressData[0]+"/analyse?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        console.log(parsedSpotifyURL)
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => response.json()) 
        .then(data => {
          setDisplay(true);
          requestData = atob(data)

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
  

  const {objectData, arrayData} = splitData(requestData)


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
        {display && generateList({ data: objectData })}
        {display && Object.keys(arrayData).map((category) => (
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
