import React from "react";
import { Card, Metric, Text } from "@tremor/react";


//generate Cart is used for creating customed div with some data
const generateCard = ({ data, text }) => (
    <Card className="max-w-xs mx-auto" style={{ width: "30vh", margin:"0.7%" }} decoration="top" decorationColor="indigo">
    <Text>{text}</Text>
    <Metric>{data}</Metric>
  </Card>
);

export default generateCard;
