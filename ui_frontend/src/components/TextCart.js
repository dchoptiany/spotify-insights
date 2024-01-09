import React from "react";
import { Card, Metric, Text } from "@tremor/react";

const generateCard = ({ data, text }) => (
    <Card className="max-w-xs mx-auto" style={{ width: "30vh", margin:"0.7%" }} decoration="top" decorationColor="indigo">
    <Text>{text}</Text>
    <Text>{data}</Text>
  </Card>
);

export default generateCard;
