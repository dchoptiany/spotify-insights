import React from 'react';
import { Card, ScatterChart, Text, Title } from "@tremor/react";


const generateScatterChart = ({ data, category }) => {
  const formattedData =data.map((value, index) => ({ x: index, y: value, category:"" }));
  console.log(formattedData)


  return (
    <Card className='scatter'>
    <Title>{category}</Title>
    <ScatterChart
      className=""
      data={formattedData}
      category="x"
      x="x"
      y="y"
      sizeRange={[
        25,
        25
      ]}
      size="z"
      enableLegendSlider
    />
  </Card>
  );
};

export default generateScatterChart;