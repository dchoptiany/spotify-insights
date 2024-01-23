import { Card, List, ListItem, Title } from "@tremor/react";
import './styleComponents.css';


//Generating List of basics informations about playlist
const generateList = ({ data }) => {
  const filteredData = Object.entries(data)
    .filter(([key]) => key !== 'image')
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return (
    <Card className="List">
      <Title>Basic informations</Title>
      <List>
        {Object.entries(filteredData).map(([key, value]) => (
          <ListItem key={key}>
            <span>{`${key.replace(/_/g, ' ')}`}</span>
            <span>{` ${value}`}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default generateList;
