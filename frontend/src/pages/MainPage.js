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
  

  
  
  const handleButtonClick = async () => {
    try {
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = 'http://localhost:8080'+spotifyAdressData[2]+"/"+spotifyAdressData[0]+"ID="+spotifyAdressData[1];
        const response = await DataCollectorRequest(
          parsedSpotifyURL,
         'PUT', user);
        const data = await response.json();
        console.log('Odpowiedź serwera:', data);
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
