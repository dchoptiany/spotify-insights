import { Card, LineChart, Title } from "@tremor/react";



function convertDataFormat(exampleData) {
    const result = [];
  
    // Iteruj przez etykiety dat
    for (let i = 0; i < exampleData.date_labels.length; i++) {
      const dateLabel = exampleData.date_labels[i];
      const dataObj = { date_labels: dateLabel };
  
      // Iteruj przez gatunki i przypisz odpowiednie wartości
      for (let j = 0; j < exampleData.genre_scores.length; j++) {
        const genre = exampleData.genre_scores[j][0];
        const score = exampleData.genre_scores[j][1][i];
  
        dataObj[genre] = score;
      }
  
      result.push(dataObj);
    }
  
    return result;
  }


  const generateLineChart = ({ data, text }) => {
    // Konwertuj dane przed użyciem w wykresie
    const musicTypes = data.genre_scores.map(([genre]) => genre);
    const newData = convertDataFormat(data);

  
    return (
      <Card className="lineChart">
        <Title>{text}</Title>
        {/* Użyj nowo sformatowanych danych */}
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