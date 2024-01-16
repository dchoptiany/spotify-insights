import { BarChart, Card, Title } from "@tremor/react";
import './styleComponents.css';

const customTooltip = ({ payload, active, label }) => {
    if (!active || !payload) return null;
  
    return (
      <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border border">
        <div className="border-tremor-border dark:border-dark-tremor-border inline-flex items-center border-b px-4 py-2">
          <p className="text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
            {label}
          </p>
        </div>
      </div>
    );
  };

const generateBarChart = ({ data, category, category_name }) => {
    const transformedData = data.map(([label, value]) => ({ first: label ,second: value}));

    const formattedCategory = category.replace(/_/g, ' ');

   return (
     <Card className="barList">
        
        <Title style={{ padding: '7px' }}>{formattedCategory}</Title> 
       <BarChart
          className="mt-6"
         data={transformedData}
         colors={["green"]}
         categories={["second"]}
         index="first"  
         layout="horizontal"
         showLegend={false}
         showAnimation={true}
         customTooltip={customTooltip}
         showXAxis = {true}
         rotateLabelX={{
          angle: 50,
          verticalShift:27,
          xAxisHeight:90
        }}	
        />
     </Card>
   );

  }
  
  export default generateBarChart;
  