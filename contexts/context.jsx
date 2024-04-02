import { createContext, useContext, useReducer, useState } from "react";
import { initialState, taskReducer } from "../reducers/taskReducer";

const GlobalContext = createContext("");

const GlobalProvider = ({ children }) => {
  //global UI util states
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  //global task state management
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        openModal,
        actionType,
        selectedTask,
        setOpenModal,
        setActionType,
        setSelectedTask,
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
