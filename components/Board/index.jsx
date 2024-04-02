import { Text } from "@rneui/themed";
import { FlatList, ScrollView, View, StyleSheet } from "react-native";
import Grid from "../Grid";
import {
  COMPLETED,
  DEFERRED,
  DEPLOYED,
  IN_PROGRESS,
  PENDING,
} from "../../constants/taskConstants";

export default function Board() {
  const taskTypes = [
    {
      type: PENDING,
      name: "Pending",
    },
    {
      type: IN_PROGRESS,
      name: "In Progress",
    },
    {
      type: COMPLETED,
      name: "Completed",
    },
    {
      type: DEPLOYED,
      name: "Deployed",
    },
    {
      type: DEFERRED,
      name: "Deferred",
    },
  ];

  const GridGap = () => {
    return <View style={{ width: 10 }}></View>;
  };
  return (
    <FlatList
      horizontal
      data={taskTypes}
      renderItem={({ item }) => (
        <Grid key={item} type={item.type} name={item.name} />
      )}
      ItemSeparatorComponent={() => <GridGap />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
