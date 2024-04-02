import {
  ADD_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  SORT_TASKS,
  UPDATE_TASK,
} from "../constants/taskConstants";
import { bulkSort, sortTasks } from "../utils/sortTask";
import { chooseTaskList, filterTasks } from "../utils/utils";

// Initial state for a task
export const initialState = {
  pendingTasks: [], // Array to store tasks
  inProgressTasks: [], // Array to store tasks
  completedTasks: [], // Array to store tasks
  deployedTasks: [], // Array to store tasks
  deferredTasks: [], // Array to store tasks
};

/*
  STRUCTURE OF EACH TASK IN TASKLISTS : 
 {
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String,
  assignee: String, 
  priority: String,
 }
 */

// Reducer function to manage state updates
export const taskReducer = (state, action) => {
  let taskType = chooseTaskList(action.payload.status); //in which array to perform operation
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [taskType]: [action.payload, ...state[taskType]],
      };
    case UPDATE_TASK:
      // eslint-disable-next-line no-case-declarations
      let taskPayload = action.payload;
      // eslint-disable-next-line no-case-declarations
      let currentTaskType = chooseTaskList(taskPayload.prevStatus);

      if (taskPayload.isStatusChange) {
        let taskIndex = state[currentTaskType].findIndex(
          (e) => e._id === taskPayload._id
        );

        let updatedTaskList = [...state[currentTaskType]];

        updatedTaskList.splice(taskIndex, 1);

        let updatedTask = {
          ...state[currentTaskType][taskIndex],
          ...taskPayload,
        };
        let newTaskStatusList = taskType;

        return {
          ...state,
          [currentTaskType]: updatedTaskList,
          [newTaskStatusList]: [updatedTask, ...state[newTaskStatusList]],
        };
      }

      return {
        ...state,
        [taskType]: state[taskType].map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        [taskType]: state[taskType].filter(
          (task) => task._id !== action.payload._id
        ),
      };

    case FILTER_TASKS:
      // eslint-disable-next-line no-case-declarations
      if (!action.payload.filterPreference) return state;
      let taskStatusList = chooseTaskList(action.payload.filterPreference);
      // eslint-disable-next-line no-case-declarations
      let tasksList = [...state[taskStatusList]];

      //Filters the taskList on the basis of filters and returns a new Array.
      // eslint-disable-next-line no-case-declarations
      const filteredTasks = filterTasks(tasksList, action.payload.filters);
      return {
        ...state,
        [taskStatusList]: filteredTasks,
      };

    case SORT_TASKS:
      const { sortPreference, order } = action.payload;
      const sortedTasks = bulkSort(state, sortPreference, order);

      return {
        ...state,
        ...sortedTasks,
      };

    default:
      return state;
  }
};
