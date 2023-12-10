import React, { useState } from 'react';
import Button from './../components/Button';
import {DataCollectorRequest} from './../actions/authActions';


const MainPage = ({user}) => {
  const [textInput, setTextInput] = useState('');


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };


  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  

  
  
  const handleButtonClick =  () => {
    try {
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = 'http://localhost:8080/spotify-api/'+spotifyAdressData[0]+"?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => response.json()) 
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    } catch (error) {
      console.error('Błąd podczas zapytania:', error);
    }
  };
  

  return (
    <div className="input-form-container">
      <div className="input-container">
        <label>
          Link:
          <input className="input-field" type="text" value={textInput} onChange={handleInputChange} />
        </label>
        <Button onClick={handleButtonClick} text="Submit" />
      </div>
    </div>
  );

};

export default MainPage;
