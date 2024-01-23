import React,{useState} from 'react';
import { Flex } from "@tremor/react";
import { DateRangePicker } from "@tremor/react";
import DynamicSelect from '../components/DynamicSelect';



//Global Trends combo page
const GlobalTrendsCombo = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    
//Formating date
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


//update date
  const updateDates = ({start,end})=>{
    setStartDate(start)
    setEndDate(end)
  }




  
 return (
    <div className="input-form-container">
      <Flex justifyContent="center" alignItems="center" width="50%">

      <div>
        <div className='url_desc'>Calculate trends in music genres and decades!</div>
        <div className='url_desc2'>Select a period of time, genres and decades you are interested in</div>
        <div className='url_desc2'> and let the calculates begin!</div>
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
      
      <div className='selectItems'>
        <Flex justifyContent="center" alignItems="center" width="50%">

        <DynamicSelect startDate={startDate} endDate={endDate} />;          
        </Flex>
      </div>
    </div>
  );
};

export default GlobalTrendsCombo;
