export const sortTasks = (tasks, sortBy, sortOrder) => {
  const sortingFunctions = {
    Priority: (a, b) => {
      const priorityOrder = { P0: 0, P1: 1, P2: 2 };
      return sortOrder
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    },
    StartDate: (a, b) =>
      sortOrder ? a.startDate - b.startDate : b.startDate - a.startDate,
    EndDate: (a, b) =>
      sortOrder ? a.endDate - b.endDate : b.endDate - a.endDate,
  };

  const sortingFunction = sortingFunctions[sortBy];
  if (!sortingFunction) {
    console.error("Invalid sorting criteria");
  }

  return tasks.slice().sort(sortingFunction);
};

export const bulkSort = (state, sortPreference, order) => {
  let sortedResult = {};
  let orderBool = order === "Increasing" ? true : false; //true for Increasing, false for Decreasing
  for (const key in state) {
    sortedResult = {
      ...sortedResult,
      [key]: [...sortTasks(state[key], sortPreference, orderBool)],
    };
  }
  return sortedResult;
};
