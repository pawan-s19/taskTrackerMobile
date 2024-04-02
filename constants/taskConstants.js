// Action types
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const FILTER_TASKS = "FILTER_TASKS";
export const SORT_TASKS = "SORT_TASKS";

// Status types
export const PENDING = "pending";
export const IN_PROGRESS = "inProgress";
export const COMPLETED = "completed";
export const DEPLOYED = "deployed";
export const DEFERRED = "deferred";

// Constant UI states
export const taskPriorities = ["P0", "P1", "P2"];
export const taskStatusList = [
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  DEPLOYED,
  DEFERRED,
];
