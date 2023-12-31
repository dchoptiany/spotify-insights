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
    const str = category_name.toString()
    const length = data.length
    const transformedData = data.map(([label, value]) => ({ first: label ,second:  -1*(value-length-1)}));

    const formattedCategory = category.replace(/_/g, ' ');

   return (
     <Card className="barList">
        
        <Title style={{ padding: '7px' }}>{formattedCategory}</Title> 
       <BarChart
         data={transformedData}
         className="h-72"
         colors={["green"]}
         categories={["second"]}
         index="first"  
         showYAxis={false}
         showLegend={false}
         showAnimation={true}
         startEndOnly= {true}	
         customTooltip={customTooltip}

        />
     </Card>
   );

  }
  
  export default generateBarChart;
  