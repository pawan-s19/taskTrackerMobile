import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Dimensions } from "react-native";
import CustomDropDown from "../CustomDropDown";
import CustomTextInput from "../CustomTextInput";
import { useState, useEffect } from "react";
import {
  ADD_TASK,
  COMPLETED,
  PENDING,
  UPDATE_TASK,
  taskPriorities,
  taskStatusList,
} from "../../constants/taskConstants";
import { Button, Text } from "@rneui/themed";
import { generateUUID } from "../../utils/generateId";
import { GlobalState } from "../../contexts/context";
import { chooseTaskList } from "../../utils/utils";
import { findTask } from "../../utils/findTask";
import { Alert } from "react-native";

const { height, width } = Dimensions.get("window");

export default ({ taskDets: selectedTask }) => {
  const { state, dispatch } = GlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [isStatusChange, setIsStatusChange] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    //Find the task to be edited and populate the values in local state on first render.
    const task = findTask(
      selectedTask._id,
      state[chooseTaskList(selectedTask.status)]
    );
    setTask(task);
    if (!task) {
      return;
    }

    setTitle(task.title);
    setDescription(task.description);
    setTeam(task.team);
    setAssignee(task.assignee);
    setPriority(task.priority);
    setTaskStatus(task.status);
  }, [selectedTask._id, selectedTask.status, state]);

  const editTask = () => {
    let payload = {
      title,
      description,
      team,
      assignee,
      priority,
      status: taskStatus,
      _id: selectedTask._id,
      isStatusChange,
      prevStatus: task.status,
    };

    if (taskStatus == COMPLETED) payload.endDate = new Date();

    dispatch({
      type: UPDATE_TASK,
      payload,
    });

    Alert.alert("Success", "Task edited successfully", [{ text: "OK" }]);

    setIsStatusChange(false); //to reupdate status for next edit operations
  };

  const updateTaskStatus = (val) => {
    setTaskStatus(val);
    setIsStatusChange(true);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text h4>Edit Task</Text>
      </View>
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
      <CustomDropDown
        value={taskStatus}
        setValue={updateTaskStatus}
        label={"Status"}
        data={taskStatusList.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <Button
        onPress={editTask}
        buttonStyle={{ paddingHorizontal: 30 }}
        title={"Edit"}
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
