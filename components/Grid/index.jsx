import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { lightColors, Divider, Text } from "@rneui/themed";
import TaskCard from "../TaskCard";
import { GlobalState } from "../../contexts/context";
import { chooseTaskList } from "../../utils/utils";

const { height, width } = Dimensions.get("window");

export default function Grid({ type, name }) {
  const { state } = GlobalState();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: lightColors.grey1 }}>{name.toUpperCase()}</Text>
      </View>
      <Divider />
      <FlatList
        data={state[chooseTaskList(type)]}
        renderItem={({ item }) => <TaskCard key={item._id} taskDets={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    borderRadius: 5,
    minWidth: width / 1.2,
  },
  header: {
    padding: 10,
    paddingHorizontal: 20,
  },
});
