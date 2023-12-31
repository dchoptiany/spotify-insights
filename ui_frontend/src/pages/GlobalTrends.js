import React from 'react';
import generateLineChart from '../components/LineChart';
import { Flex } from "@tremor/react";



const GlobalTrends = () => {
  
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



  
  return (
    <div className="input-form-container">
        <b>ola</b>
      <div className='plots'>
      <Flex justifyContent="center" alignItems="center" width="50%">
      {generateLineChart({data: exampleData, text:"Global trends"})}
      </Flex>
        </div>
    </div>
    
    
  );

};

export default GlobalTrends;
