import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import CustomDropDown from "../CustomDropDown";
import CustomTextInput from "../CustomTextInput";
import { useState } from "react";
import {
  ADD_TASK,
  PENDING,
  taskPriorities,
} from "../../constants/taskConstants";
import { Button } from "@rneui/themed";
import { generateUUID } from "../../utils/generateId";
import { GlobalState } from "../../contexts/context";

const { height, width } = Dimensions.get("window");
export default () => {
  const { dispatch, state } = GlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("P0");

  const createTask = () => {
    let payload = {
      title,
      description,
      team,
      assignee,
      priority,
      startDate: new Date(),
      endDate: null,
      _id: generateUUID(),
    };
    payload.status = PENDING; //while creating task status will be default pending
    dispatch({
      type: ADD_TASK,
      payload,
    });
    Alert.alert("Success", "Task created successfully", [{ text: "OK" }]);
  };
  return (
    <View style={styles.container}>
      <CustomTextInput
        value={title}
        setValue={setTitle}
        placeholder={"Title"}
      />
      <CustomTextInput
        value={description}
        setValue={setDescription}
        placeholder={"Description"}
      />
      <CustomTextInput value={team} setValue={setTeam} placeholder={"Team"} />
      <CustomTextInput
        value={assignee}
        setValue={setAssignee}
        placeholder={"Assignee"}
      />
      <CustomDropDown
        value={priority}
        setValue={setPriority}
        label={"Priority"}
        data={taskPriorities.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <Button
        onPress={createTask}
        buttonStyle={{ paddingHorizontal: 30 }}
        title={"Create"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: width,
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    width: width,
  },
});
