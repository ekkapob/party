import React, {
  useEffect,
  useReducer,
  createContext,
} from "react";

export const CredentialContext = createContext();

const initialState = {
  accountId: '', email: '', accessToken: '', refreshToken: '', exp: 0,
};

const SET_CREDENTIAL = 'SET_CREDENTIAL';
const RESET_CREDENTIAL = 'RESET_CREDENTIAL';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CREDENTIAL:
      const newState = { ...state, ...action.payload };
      storeCredential(newState);
      return newState;
    case RESET_CREDENTIAL:
      removeCredential();
      return { ...initialState };
    default:
      return state;
  }
};

const storeCredential = (value) => {
  localStorage.setItem(process.env.REACT_APP_KEY, JSON.stringify(value));
};

const getCredential = () => {
  return localStorage.getItem(process.env.REACT_APP_KEY);
};

const removeCredential = () => {
  localStorage.removeItem(process.env.REACT_APP_KEY);
};

export const CredentialContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = [state, dispatch];

  useEffect(() => {
    const credential = JSON.parse(getCredential());
    if (!credential) return;

    dispatch({
      type: SET_CREDENTIAL,
      payload: credential,
    });
  }, []);

  return (
    <CredentialContext.Provider value={contextValue}>
      { props.children }
    </CredentialContext.Provider>
  )
};
