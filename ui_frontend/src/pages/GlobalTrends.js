import React,{useState} from 'react';
import generateLineChart from '../components/LineChart';
import { Flex } from "@tremor/react";
import Button from '../components/Button';
import { DateRangePicker } from "@tremor/react";
import  {DataSketchesRequest} from './../actions/authActions'


const GlobalTrends = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [display, setDisplay] = useState(false);
    const [sketches_data, setData] = useState({});
    

const handleSubmit = ()=>{

}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  if(day == NaN){
    return "";
  }

  return `${day}-${month}-${year}`;
};

 const handleButtonClick =  () => {
   try {
    console.log("done");
       const parsedSpotifyURL = "http://aws_hostname:6060/data_sketch/trends";
       if(startDate!="" && endDate!="" ){
       DataSketchesRequest(parsedSpotifyURL, startDate, endDate)
       .then(response => {
        console.log("response recieved")
         console.log(response)
         return response.text()
       }) 
       .then(data => {
         setDisplay(true);
         const cleanedData = data.replace(/"/g, '');
         console.log(data)
         let requestData = JSON.parse(atob(cleanedData));
         console.log(requestData)
 
         setData(requestData);
         setDisplay(true);
 
 
       })
      
       .catch(error => {
         console.log(error);
         setDisplay(false);
       });
      }
   } catch (error) {
     console.error('Błąd podczas zapytania:', error);
   }
  };


  const updateDates = ({start,end})=>{
    setStartDate(start)
    console.log(start)
    setEndDate(end)
    console.log(end)
  }

  
 return (
    <div className="input-form-container">

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
