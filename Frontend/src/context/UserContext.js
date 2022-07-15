import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users : action.payload
      };

    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, dispatchUsers] = useReducer(usersReducer, {
    users: null,
  });

  return (
    <UsersContext.Provider value={{ ...state, dispatchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
