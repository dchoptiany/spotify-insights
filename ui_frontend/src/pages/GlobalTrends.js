import React,{useState} from 'react';
import generateLineChart from '../components/LineChart';
import { Flex } from "@tremor/react";
import Button from '../components/Button';
import { DateRangePicker } from "@tremor/react";
import  {DataSketchesRequest} from './../actions/authActions'




//Glogal Trends page
const GlobalTrends = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [display, setDisplay] = useState(false);
    const [sketches_data, setData] = useState({});
    

    //Formatting date
const formatDate = (dateString) => {
  if (isNaN(Date.parse(dateString))) {
    return "";
  }

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  if (isNaN(day)) {
    return "";
  }

  return `${day}-${month}-${year}`;
};





//Handling button click and sending request
 const handleButtonClick =  () => {
  try {
      const parsedSpotifyURL = "http://aws_hostname:6060/data_sketch/trends";
      if(startDate!="" && endDate!="" ){
      DataSketchesRequest(parsedSpotifyURL, startDate, endDate)
      .then(response => {
        return response.text()
      }) 
      .then(data => {
        setDisplay(true);
        const cleanedData = data.replace(/"/g, '');
        let requestData = JSON.parse(atob(cleanedData)); 
        setData(requestData);
        setDisplay(true);
      })
     
      .catch(error => {
        setDisplay(false);
      });
     }
  } catch (error) {
    console.error('Błąd podczas zapytania:', error);
  }
  };

//Updating dates
  const updateDates = ({start,end})=>{
    setStartDate(start)
    setEndDate(end)
  }
  
 return (
    <div className="input-form-container">
      <Flex justifyContent="center" alignItems="center" width="50%">

      <div>
        <div className='url_desc'> Check current trending music genres and decades!</div>
        <div className='url_desc2'>Select a period of time you are interested in</div>
        <div className='url_desc2'> and let the analysis begin!</div>
      </div>
      </Flex>

      <Flex justifyContent="center" alignItems="center" width="50%">
      <DateRangePicker 
        className="datePicker" 
        enableSelect={false} 
        minDate={1705273200000} 
        maxDate={new Date()}   
        onValueChange={(selectedDates) => {updateDates({start: formatDate(selectedDates.from), end: formatDate(selectedDates.to)})}}>
        </DateRangePicker>
      </Flex>
      <Flex justifyContent="center" alignItems="center" width="50%">
        <Button onClick={handleButtonClick} text="Submit" />
        </Flex>

        <div className='plots'>
        <Flex justifyContent="center" alignItems="center" width="50%">
          {display && generateLineChart({ data: sketches_data, text: "Global trends" })}
        </Flex>
      </div>
      
    
    </div>
  );
};

export default GlobalTrends;
