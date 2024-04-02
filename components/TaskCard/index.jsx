import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import {
  Text,
  Card,
  Button,
  Icon,
  Badge,
  Avatar,
  Chip,
  lightColors,
  Dialog,
} from "@rneui/themed";
import CustomDialog from "../CustomDialog";
import { getInitials } from "../../utils/utils";
import CustomOverlay from "../CustomOverlay";
import EditTask from "../EditTask";
import {
  COMPLETED,
  DEFERRED,
  DELETE_TASK,
  DEPLOYED,
  IN_PROGRESS,
  PENDING,
} from "../../constants/taskConstants";
import { GlobalState } from "../../contexts/context";
import { formatDate } from "../../utils/formatDate";

const { height, width } = Dimensions.get("window");

const TaskCard = ({ taskDets }) => {
  const { dispatch } = GlobalState();
  const { title, description, assignee, priority, status, _id } = taskDets;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const deleteTask = () => {
    let payload = {
      _id: taskDets._id,
      status: taskDets.status,
    };
    dispatch({
      type: DELETE_TASK,
      payload,
    });
    Alert.alert("Success", "Task deleted successfully", [{ text: "OK" }]);
  };

  const RenderTaskActions = () => {
    return (
      <>
        <Dialog.Title title="Actions" />
        <Text>Perform actions such as Edit and Delete on your tasks.</Text>
        <Dialog.Actions>
          <Dialog.Button title="Edit" onPress={toggleOverlay} />
          <Dialog.Button
            titleStyle={{ color: "red" }}
            title="Delete"
            onPress={deleteTask}
          />
        </Dialog.Actions>
      </>
    );
  };

  const generateStatusStyle = (status) => {
    switch (status) {
      case PENDING:
        return [
          { color: lightColors.white },
          { backgroundColor: lightColors.divider },
        ];
      case IN_PROGRESS:
        return [
          { color: lightColors.white },
          { backgroundColor: lightColors.warning },
        ];
      case COMPLETED:
        return [
          { color: lightColors.white },
          { backgroundColor: lightColors.success },
        ];
      case DEPLOYED:
        return [
          { color: lightColors.white },
          { backgroundColor: lightColors.primary },
        ];
      case DEFERRED:
        return [
          { color: lightColors.white },
          { backgroundColor: lightColors.error },
        ];
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <View style={styles.header}>
            <Text>{title}</Text>
            <Badge
              badgeStyle={styles.badge}
              value={priority}
              status="primary"
            />
          </View>
          <View style={styles.body}>
            <Text>{description}</Text>
            <View style={styles.bodySection}>
              <View style={styles.avataarContainer}>
                <Avatar
                  size={32}
                  rounded
                  title={getInitials(assignee)}
                  containerStyle={styles.avataar}
                />
                <Text>{assignee}</Text>
              </View>
              <Chip
                titleStyle={styles.chipTitle}
                buttonStyle={styles.chip}
                title={
                  status == COMPLETED
                    ? formatDate(taskDets.endDate)
                    : formatDate(taskDets.startDate)
                }
                type="outline"
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Chip
              titleStyle={[styles.statusText, generateStatusStyle(status)[0]]}
              buttonStyle={[styles.solidChip, generateStatusStyle(status)[1]]}
              title={status.toUpperCase()}
            />
            <Button
              onPress={toggleDialog}
              buttonStyle={styles.editButton}
              radius={"sm"}
              type="solid"
            >
              <Icon iconStyle={styles.editIcon} name="edit" color="white" />
            </Button>
          </View>
        </Card>
      </View>
      <CustomDialog visible={dialogVisible} toggleDialog={toggleDialog}>
        <RenderTaskActions />
      </CustomDialog>
      <CustomOverlay visible={overlayVisible} toggleOverlay={toggleOverlay}>
        <EditTask taskDets={taskDets} />
      </CustomOverlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: width / 1.2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    height: 20,
    width: 30,
  },
  avataar: {
    backgroundColor: lightColors.grey3,
  },
  avataarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  body: {
    marginBottom: 10,
  },
  bodySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  chip: {
    padding: 2,
  },
  chipTitle: {
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  solidChip: { padding: 3 },
  statusText: { fontSize: 12 },
  editButton: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  editIcon: {
    fontSize: 18,
  },
});

export default TaskCard;
