import { Card, DonutChart, Title } from "@tremor/react";

      
      const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
      
      const generateColors = (count) => {
        const colorNames = ["slate", "violet", "indigo", "rose", "cyan", "amber","slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
        const colors = colorNames.slice(0, count); 
        return colors;
      };



      const generateChart = ({ data, category, index }) => {
        let chartData = data[category];
      
        if (!Array.isArray(chartData)) {
          chartData = [chartData];
        }

        const formattedData = {[category]: chartData };


      
        return (
          <Card key={category}>
            <DonutChart
              data={formattedData}
              category={category}
              index={index}
              variant="pie"
              valueFormatter={valueFormatter}
              showAnimation={true}
              colors={generateColors(chartData.length)}
              />
              <Title>{category.replace("_", " ")}</Title>
          </Card>
        );
      };
      

      export default generateChart;