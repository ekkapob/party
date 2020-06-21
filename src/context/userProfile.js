import React, { useReducer, createContext } from "react";
export const UserProfileContext = createContext();

const initialState = { accessToken: '', email: '' };

const RESET_USER_PROFILE = 'RESET_USER_PROFILE';

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_USER_PROFILE:
      return { ...initialState };
    default:
      return state;
  }
};

export const UserProfileContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = [state, dispatch];

  return (
    <UserProfileContext.Provider value={contextValue}>
      {props.children}
    </UserProfileContext.Provider>
  )
};
