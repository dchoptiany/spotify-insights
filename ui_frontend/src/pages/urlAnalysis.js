import React, { useState } from 'react';
import Button from '../components/Button';
import {DataCollectorRequest} from '../actions/authActions';
import generateList from '../components/List';
import generateBarChart from '../components/BarChart';


const UrlAnalysis = () => {
  const [textInput, setTextInput] = useState('');
  const [display, setDisplay] = useState(false)
  const [objectData, setObjectData] = useState({});
  const [arrayData, setArrayData] = useState({});


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
  let objectData = {};
  let arrayData = {};

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
        const parsedSpotifyURL = "http://aws_hostname:6060/"+spotifyAdressData[0]+"/analyse?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
        console.log(parsedSpotifyURL)
        DataCollectorRequest(parsedSpotifyURL)
        .then(response => {
          console.log(response)
          return response.text()
        }) 
        .then(data => {
          setDisplay(true);
          const cleanedData = data.replace(/"/g, '');
          console.log(data)
          requestData = JSON.parse(atob(cleanedData));
          console.log(requestData)

          const { objectData, arrayData } = splitData(requestData);
          setObjectData(objectData);
          setArrayData(arrayData);


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

export default UrlAnalysis;
