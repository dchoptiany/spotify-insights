import {Card, LineChart, Title, Flex } from "@tremor/react";



function convertDataFormat(exampleData) {
  const resultGenres = [];
  const resultDecades = [];
  const resultCombo = [];

  for (let i = 0; i < exampleData.date_labels.length; i++) {
    const dateLabel = exampleData.date_labels[i];
    const dataObj = { date_label: dateLabel };
    const dataObjDecades = { date_label: dateLabel };
    const dataObjCombo = { date_label: dateLabel };

    for (const genre in exampleData.genre_scores) {
      if (exampleData.genre_scores.hasOwnProperty(genre)) {
        const score = exampleData.genre_scores[genre][i];
        dataObj[genre] = score;
      }
    }

    for (const decade in exampleData.decade_scores) {
      if (exampleData.decade_scores.hasOwnProperty(decade)) {
        const score = exampleData.decade_scores[decade][i];
        dataObjDecades[decade] = score;
      }
    }

    for(const combo in exampleData.combo_scores){
      if (exampleData.combo_scores.hasOwnProperty(combo)) {
        const score = exampleData.combo_scores[combo][i];
        dataObjCombo[combo] = score;
      }
    }

    resultGenres.push(dataObj);
    resultDecades.push(dataObjDecades);
    resultCombo.push(dataObjCombo);
  }

  return {resultGenres, resultDecades, resultCombo};
}


  const generateLineChart = ({ data, text }) => {
    const musicTypes = Object.keys(data.genre_scores);
    const result = convertDataFormat(data);
    console.log(result)
    const decades = Object.keys(data.decade_scores)
  
    return (
      <div style={{width:"100%"}}>

      <Flex justifyContent="center" alignItems="center">
      <Card className="lineChart">
        <Title>{text}</Title>
        <LineChart
          className="h-72 mt-4"
          data={result.resultGenres}
          index="date_label"
          categories={musicTypes}
          colors={["emerald", "gray","pink","red","orange",
          "indigo","amber","blue","cyan","emerald","fuchsia","green","indigo",
        "lime","zinc","orange","sky","rose","purple","yellow"]}
          yAxisWidth={40}
          showXAxis	={true}
          rotateLabelX={{
            angle: 50,
            verticalShift:17,
            xAxisHeight:50
          }}	


          
          
        />
      </Card>
      </Flex>

<Flex justifyContent="center" alignItems="center">

      <Card className="lineChart">
      <Title>Trending Decades</Title>
      <LineChart
        className="h-72 mt-4"
        data={result.resultDecades}
        index="date_label"
        categories={decades}
        colors={["emerald", "gray","pink","red","orange",
        "indigo","amber","blue","cyan","emerald","fuchsia","green","indigo",
      "lime","zinc","orange","sky","rose","purple","yellow"]}
        yAxisWidth={40}
        rotateLabelX={{
          angle: 50,
          verticalShift:17,
          xAxisHeight:50
        }}
        />
      </Card>
      </Flex>
      </div>
    );
  };

  export default  generateLineChart;  