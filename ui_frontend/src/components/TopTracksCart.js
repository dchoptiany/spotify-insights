import React from "react";
import { Card, Metric, Text } from "@tremor/react";

const generateTextCard = (data, text,t) => (
  <Card className="textCartTop"  decoration="top" decorationColor="non">
    <Text className="text">{text}</Text>
    <Text className="text">{data}</Text>
    <Text className="text">{t}</Text>
  </Card>
);

export default generateTextCard;
