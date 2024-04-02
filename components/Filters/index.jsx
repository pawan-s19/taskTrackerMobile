import { useEffect, useState } from "react";
import {
  FILTER_TASKS,
  PENDING,
  SORT_TASKS,
  taskPriorities,
} from "../../constants/taskConstants";
import { GlobalState } from "../../contexts/context";
import CustomDropDown from "../CustomDropDown";
import CustomTextInput from "../CustomTextInput";
import { Button, Chip, Divider, Text } from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Dimensions, View, Pressable } from "react-native";
import { formatDate } from "../../utils/formatDate";
import { Alert } from "react-native";

const { height, width } = Dimensions.get("window");

export default function Filters() {
  const { dispatch } = GlobalState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [assignee, setAssignee] = useState(null);
  const [priority, setPriority] = useState("P0");
  const [filterPreference, setFilterPreference] = useState(PENDING);
  const [startDateVisible, setStartDateVisibile] = useState(false);
  const [endDateVisible, setEndDateVisibile] = useState(false);
  const [sortPreference, setSortPreference] = useState("Priority");
  const [order, setOrder] = useState("Increasing");

  const showStartDatePicker = () => {
    setStartDateVisibile(!startDateVisible);
  };
  const showEndDatePicker = () => {
    setEndDateVisibile(!endDateVisible);
  };

  const confirmStartDate = (date) => {
    setStartDate(date);
  };
  const confirmEndDate = (date) => {
    setEndDate(date);
  };
  const applyFilters = (e) => {
    e.preventDefault();

    let filters = {};

    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (assignee) filters.assignee = assignee;
    if (priority) filters.priority = priority;

    let payload = {
      filters,
      filterPreference,
    };

    dispatch({
      type: FILTER_TASKS,
      payload,
    });
    Alert.alert("Success", "Filters applied successfully", [{ text: "OK" }]);
  };

  useEffect(() => {
    return () => {
      setStartDate(null);
      setEndDate(null);
      setAssignee(null);
    };
  }, []);

  const sortList = () => {
    let payload = {
      sortPreference,
      order,
    };

    dispatch({
      type: SORT_TASKS,
      payload,
    });

    Alert.alert("Success", "Tasks sorted successfully", [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <Text h4>Filters</Text>
      <View
        style={{
          flexDirection: "row",
          width: width,
          gap: 10,
        }}
      >
        <Chip
          onPress={showStartDatePicker}
          title={startDate ? formatDate(startDate) : "Select Start Date"}
        />
        <Chip
          onPress={showEndDatePicker}
          title={endDate ? formatDate(endDate) : "Select End Date"}
        />
      </View>
      <DateTimePickerModal
        isVisible={startDateVisible}
        mode="date"
        onConfirm={confirmStartDate}
        onCancel={showStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={endDateVisible}
        mode="date"
        onConfirm={confirmEndDate}
        onCancel={showEndDatePicker}
      />
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
        customStyles={{ width: "100%" }}
      />
      <Button
        buttonStyle={{ paddingHorizontal: 40 }}
        onPress={applyFilters}
        title={"Apply"}
      />
      <Text h4>Sort</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <CustomDropDown
          value={sortPreference}
          setValue={setSortPreference}
          label={"Priority"}
          data={["Priority", "StartDate", "EndDate"].map((item) => ({
            value: item,
            label: item,
          }))}
          customStyles={{ width: "50%" }}
        />
        <CustomDropDown
          value={order}
          setValue={setOrder}
          label={"Increasing"}
          data={["Increasing", "Decreasing"].map((item) => ({
            value: item,
            label: item,
          }))}
          customStyles={{ width: "50%" }}
        />
      </View>
      <Button onPress={sortList} title={"Sort"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: width,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
