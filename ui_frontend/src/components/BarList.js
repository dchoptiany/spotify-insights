import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

const generateBarList = ({ data, text }) => {
    const newData = [{ "name": text, "value": data }];
    return (
    <Card className="">
      <Title>{text}</Title>
      <BarList data={newData} className="mt-2" />
    </Card>
  );
};

export default generateBarList;
