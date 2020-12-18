import React from "react";
import { AppContainer } from "./styles";
import Card from "./components/Card";
import Column from "./components/Column";
import AddNewItem from "./components/AddNewItem";

const App = () => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate App Scaffold" />
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  );
};

export default App;
