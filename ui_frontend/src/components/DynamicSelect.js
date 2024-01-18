import React, { useState } from "react";
import { Button, Flex, Select, SelectItem } from "@tremor/react";
import generateLineChart from "./LineChartCombo";
import { DataSketchesRequest, DataSketchesRequestCombo } from "../actions/authActions";

const DynamicSelect = ({startDate, endDate}) => {
    
  const [selectItems, setSelectItems] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedDecades, setSelectedDecades] = useState({});
  const [sketchesData, setData] = useState({})
  const [display, setDisplay] = useState(false);
  const [requestData, setRequest] = useState({});


    if (startDate === "" || endDate === "") {
        return (
          <div>
            Enter date
          </div>
        );
      }
  const initialOptions = [
    { label: "Pop", value: "Pop" },
    { label: "Rock", value: "Rock" },
    { label: "Rap", value: "Rap" },
    { label: "Blues", value: "Blues" },
    { label: "Classical", value: "Classical" },
    { label: "Dance", value: "Dance" },
    { label: "Disco", value: "Disco" },
    { label: "Hip-Hop", value: "Hip-Hop" },
    { label: "Jazz", value: "Jazz" },
    { label: "Latin", value: "Latin" },
    { label: "Metal", value: "Metal" },
    { label: "R&B", value: "R&B" },
    { label: "Techno", value: "Techno" },

  ];

  const initialDecades = [
    { label: "20'", value: "20'" },
    { label: "30'", value: "30'" },
    { label: "40'", value: "40'" },
    { label: "50'", value: "50'" },
    { label: "60'", value: "60'" },
    { label: "70'", value: "70'" },
    { label: "80'", value: "80'" },
    { label: "90'", value: "90'" },
    { label: "2000'", value: "2000'" },
    { label: "2010'", value: "2010'" },
    { label: "2020'", value: "2020" },
  ];

  let data_cross = {
    "combo_scores": {
        "2000' Pop": [
            555,
            486,
            1223
        ],
        "2020' Dance": [
            680,
            713,
            5
        ],
        "90' Rap": [
            122,
            102,
            189
        ]
    },
    "date_labels": [
        "16-01-2024",
        "17-01-2024",
        "18-01-2024"
    ]
}
  const handleButtonClick = () => {
    setSelectItems([...selectItems, { genres: initialOptions, decades: initialDecades }]);
  };

  const handleSelectChange = (selectIndex, value, isDecade) => {

    console.log(value)
    const selectedValuesCopy = { ...selectedValues };
    const selectedDecadesCopy = { ...selectedDecades };

    if (isDecade) {
        selectedDecadesCopy[selectIndex] = { ...selectedDecadesCopy[selectIndex], decade: value };
      setSelectedDecades(selectedDecadesCopy);

    } else {
      selectedValuesCopy[selectIndex] = { ...selectedValuesCopy[selectIndex], genre: value };
      setSelectedValues(selectedValuesCopy);

    }

  };

  const request =  () => {
    try {
        const parsedSpotifyURL = "http://aws_hostname:6060/data_sketch/trends";
        if(startDate!="" && endDate!="" ){
        DataSketchesRequestCombo(parsedSpotifyURL, startDate, endDate,requestData)
        .then(response => {
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

  const handleSubmit = () => {
    console.log("Wybrane wartości:", selectedValues);
    console.log("Wybrane wartości:", selectedDecades);
  
    let jsonData = [];
  
    for (let i of Object.keys(selectedValues)) {
      let data = {
        genre: selectedValues[i].genre,
        decade: selectedDecades[i].decade,
      };
  
      jsonData.push(data);
    }

    setRequest(jsonData)

    request()
  };

  return (
    <div clessName="scatter" style={{width:"100%"}}>
      {selectItems.map((selectSet, selectIndex) => (
        <Flex justifyContent="center" alignItems="center" key={selectIndex}>
          <Select
          className="select"
            placeholder="Select genre"
            value={selectedValues[selectIndex]?.genre || ""}
            onValueChange={(e) => handleSelectChange(selectIndex, e, false)}
          >
            {selectSet.genres.map((item, optionIndex) => (
              <SelectItem value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <div style={{ margin: "2%" }}></div>

          <Select
          className="select"
            placeholder="Select decade"
            value={selectedDecades[selectIndex]?.decade || ""}
            onValueChange={(e) => handleSelectChange(selectIndex, e, true)}
          >
            {selectSet.decades.map((item, decadeIndex) => (
              <SelectItem key={decadeIndex} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </Flex>
      ))}
      <div style={{ margin: "4%" }}></div>
      <Button onClick={handleButtonClick}>ADD +</Button>
      <div style={{ margin: "2%" }}></div>
      <Button onClick={handleSubmit}>SUBMIT</Button>
      <div style={{width:"100%"}}>

      <Flex justifyContent="center" alignItems="center" width="100%">
          {display && generateLineChart({ data: sketchesData, text: "Combo" })}
        </Flex>
        </div>
    </div>
  );
};

export default DynamicSelect;
