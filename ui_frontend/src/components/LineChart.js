import { Card, LineChart, Title } from "@tremor/react";



function convertDataFormat(exampleData) {
  const result = [];

  for (let i = 0; i < exampleData.date_labels.length; i++) {
    const dateLabel = exampleData.date_labels[i];
    const dataObj = { date_labels: dateLabel };

    for (const genre in exampleData.genre_scores) {
      if (exampleData.genre_scores.hasOwnProperty(genre)) {
        const score = exampleData.genre_scores[genre][i];
        dataObj[genre] = score;
      }
    }

    result.push(dataObj);
  }

  return result;
}


  const generateLineChart = ({ data, text }) => {
    console.log(data)
    const musicTypes = Object.keys(data.genre_scores);
    const newData = convertDataFormat(data);

  
    return (
      <Card className="lineChart">
        <Title>{text}</Title>
        <LineChart
          className="mt-6"
          data={newData}
          index="date_labels"
          categories={musicTypes}
          colors={["emerald", "gray","pink","red"]}
          yAxisWidth={40}
        />
      </Card>
    );
  };

  export default  generateLineChart;  