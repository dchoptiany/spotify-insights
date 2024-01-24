import React from "react";
import { Card, Text } from "@tremor/react";


//Generating Text Cart
const generateTextCard = (data, text) => (
  <Card className="textCart"  decoration="top" decorationColor="indigo">
    <Text className="textItem">{text}</Text>
    <Text className="text">{data}</Text>
  </Card>
);

export default generateTextCard;
