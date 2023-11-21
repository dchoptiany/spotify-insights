import React, { useState } from 'react';
import Button from './../components/Button';
import {DataCollectorRequest} from './../actions/authActions';


const MainPage = ({user}) => {
  const [textInput, setTextInput] = useState('');
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleCheckBox1Change = () => {
    setCheckBox1(!checkBox1);
  };

  const handleCheckBox2Change = () => {
    setCheckBox2(!checkBox2);

  };

  const parseSpotifyUrl = (url) => {
    const regex = /(\/track\/|\/playlist\/|\/artist\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
  
    return match ? [match[1].replace(/\//g, ''), match[2], match[0]] : null;
  };
  
  

  const handleUrlSubmit = () => {
    const spotifyId = parseSpotifyUrl(textInput);
    console.log('Spotify ID:', spotifyId);
  };

  const getData = () => {
    let data = {
      link: textInput,
    };
  
    switch (true) {
      case checkBox1:
        data.popularity = checkBox1;
        break;
      case checkBox2:
        data.artists = checkBox2;
        break;  
      default:
        break;
    }
  
    return data;
  };
  
  
  const handleButtonClick = async () => {
    try {
      const dataJSON = getData();
      const spotifyAdressData = parseSpotifyUrl(textInput);
      if(spotifyAdressData!=null){
        const parsedSpotifyURL = 'http://localhost:8080'+spotifyAdressData[2]+"/"+spotifyAdressData[0]+"ID="+spotifyAdressData[1];
        window.open(parsedSpotifyURL)
        const response = await DataCollectorRequest(
          parsedSpotifyURL,
         'PUT',dataJSON, user);
        const data = await response.json();
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
      </div>
      <div className="checkbox-container">
        <div className="checkbox-label">
          <label>
            Popularity:
            <input type="checkbox"  className= "checkbox" checked={checkBox1} onChange={handleCheckBox1Change} />
          </label>
        </div>
        <div className="checkbox-label">
          <label>
            Artists:
            <input type="checkbox" className="checkbox" checked={checkBox2} onChange={handleCheckBox2Change} />
          </label>
        </div>

        <Button onClick={handleButtonClick} text="Submit" />
          
      </div>
    </div>
  );

};

export default MainPage;
