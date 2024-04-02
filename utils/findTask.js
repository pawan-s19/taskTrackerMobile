export const findTask = (taskId, taskList) => {
  const task = taskList.find((e) => e._id === taskId);
  if (!task) return false;
  else return task;
};
