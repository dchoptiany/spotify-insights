import { Card, List, ListItem, Title } from "@tremor/react";
import './styleComponents.css';

const generateList = ({ data }) => (
  <Card className="List">
    <Title>Basic informations</Title>
    <List>
      {Object.entries(data).map(([key, value]) => (
        <ListItem key={key}>
          <span>{`${key.replace(/_/g, ' ')}`}</span>
          <span>{` ${value}`}</span>
        </ListItem>
      ))}
    </List>
  </Card>
);

export default generateList;


