import React,{useState} from 'react';
import generateLineChart from '../components/LineChart';
import { Flex } from "@tremor/react";
import Button from '../components/Button';
import  {DataSketchesRequest} from './../actions/authActions'


const GlobalTrends = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [display, setDisplay] = useState(false);
  
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Add logic to generate line chart with the selected dates
    };
  
 let exampleData=
 {
     "date_labels": [
         "01-01-2024",
         "08-01-2024",
         "15-01-2024",
         "22-01-2024",
         "29-01-2024"
     ],
     "genre_scores": [
         [
             "pop",
             [
                 50,
                 60,
                 55,
                 62,
                 65
             ]
         ],
         [
             "rap",
             [
                 20,
                 15,
                 18,
                 10,
                 10
             ]
         ],
         [
             "disco",
             [
                 30,
                 25,
                 22,
                 28,
                 25
             ]
         ]
     ]
 };


 const handleButtonClick =  () => {
   // try {
   //   const spotifyAdressData = parseSpotifyUrl(textInput);
   //   if(spotifyAdressData!=null){
   //     const parsedSpotifyURL = "http://aws_hostname:6060/"+spotifyAdressData[0]+"/analyse?"+spotifyAdressData[0]+"_id="+spotifyAdressData[1];
   //     console.log(parsedSpotifyURL)
   //     DataSketchesRequest(parsedSpotifyURL, startDate, endDate)
   //     .then(response => {
   //       console.log(response)
   //       return response.text()
   //     }) 
   //     .then(data => {
   //       setDisplay(true);
   //       const cleanedData = data.replace(/"/g, '');
   //       console.log(data)
   //       let requestData = JSON.parse(atob(cleanedData));
   //       console.log(requestData)
/////
   //       exampleData=requestData;
   //       setDisplay(true);
////
////
   //     })
   //     .catch(error => {
   //       console.log(error);
   //     });
   // }else{
   //   setDisplay(false)
   // }
   // } catch (error) {
   //   console.error('Błąd podczas zapytania:', error);
   // }
  };

  
 return (
    <div className="input-form-container">

      <form onSubmit={handleSubmit} className='form'>
      <Flex justifyContent="center" alignItems="center" width="50%">

        <label className='element'>
          Start Date:  .    
          <input type="date" className='dateInput' value={startDate} onChange={handleStartDateChange} />
        </label>
        </Flex>
        <br />
        
        <Flex justifyContent="center" alignItems="center" width="50%">

        <label className='element'>
          End Date: .  
          <input type="date" value={endDate}  className='dateInput' onChange={handleEndDateChange} />
        </label>
        <br />
        </Flex>

        <Flex justifyContent="center" alignItems="center" width="50%">

        <Button onClick={handleButtonClick} text="Submit" />
        </Flex>

      </form>
      
      <div className='plots'>
        <Flex justifyContent="center" alignItems="center" width="50%">
          {display && generateLineChart({ data: exampleData, text: "Global trends" })}
        </Flex>
      </div>
    </div>
  );
};

export default GlobalTrends;
