import {Card, LineChart, Title, Flex } from "@tremor/react";


//Converting recieved data
function convertDataFormat(exampleData) {
  const resultCombo = [];
  for (let i = 0; i < exampleData.date_labels.length; i++) {
    const dateLabel = exampleData.date_labels[i];
    const dataObjCombo = { date_label: dateLabel };


    for(const combo in exampleData.combo_scores){
      if (exampleData.combo_scores.hasOwnProperty(combo)) {
        const score = exampleData.combo_scores[combo][i];
        dataObjCombo[combo] = score;
      }
    }

    resultCombo.push(dataObjCombo);
  }

  return {resultCombo};
}

//Generating Line Chart
  const generateLineChart = ({ data, text }) => {
    const result = convertDataFormat(data);
    console.log(result)
    const decades = Object.keys(data.combo_scores)
  
    return (
      <div style={{width:"100%"}}>

      

    <Flex justifyContent="center" alignItems="center">

      <Card className="lineChart">
      <Title>Trends</Title>
      <LineChart
        className="h-72 mt-4"
        data={result.resultCombo}
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