import React from "react";
import { Card, Metric, Text } from "@tremor/react";

const generateTextCard = (data, text) => (
  <Card className="max-w-xs mx-auto" style={{ width: "35vh", height: "15hv", margin: "2%" }} decoration="top" decorationColor="indigo">
    <Text style={{ fontWeight: 'bold' }}>{text}</Text>
    <Text style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{data}</Text>
  </Card>
);

export default generateTextCard;
