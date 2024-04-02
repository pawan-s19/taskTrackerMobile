import React, { useState } from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import Board from "../Board";
import CreateTask from "../CreateTask";
import Filters from "../Filters";

export default () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Board"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Add Task"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "add", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Filters"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "filter", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView disableSwipe={true} value={index} onChange={setIndex}>
        <TabView.Item>
          <Board />
        </TabView.Item>
        <TabView.Item>
          <CreateTask />
        </TabView.Item>
        <TabView.Item>
          <Filters />
        </TabView.Item>
      </TabView>
    </>
  );
};
