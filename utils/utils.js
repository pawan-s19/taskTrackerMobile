import {
  COMPLETED,
  DEFERRED,
  DEPLOYED,
  IN_PROGRESS,
  PENDING,
} from "../constants/taskConstants";

export const chooseTaskList = (taskStatus) => {
  switch (taskStatus) {
    case PENDING:
      return "pendingTasks";
    case IN_PROGRESS:
      return "inProgressTasks";
    case COMPLETED:
      return "completedTasks";
    case DEPLOYED:
      return "deployedTasks";
    case DEFERRED:
      return "deferredTasks";
    default:
      return null;
  }
};

// Filter function to filter tasks based on criteria
export const filterTasks = (tasks, filters) => {
  return tasks.filter((task) => {
    for (const key in filters) {
      if (task[key] !== filters[key]) {
        return false; // Filter doesn't match, skip this task
      }
    }
    return true; // All filters match
  });
};

export const getInitials = (name) => {
  const nameParts = name.split(/\s+/);
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
  return initials.join("");
};
