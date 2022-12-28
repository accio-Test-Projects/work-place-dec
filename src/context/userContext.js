import React, { useReducer, createContext, useEffect } from "react";

export const userContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: JSON.parse(localStorage.getItem("user")) ? true : false,
  userInfo:JSON.parse(localStorage.getItem("userInfo")) || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('user',JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        user: null,
        isAuth: false,
        userInfo: null,
      };
    case "SET_USER_INFO":
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
      return {
        ...state,
        userInfo: action.payload,
      }
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state,'change');
  }, [state]);
  return (
    <userContext.Provider value={[state, dispatch ]}>
      {children}
    </userContext.Provider>
  );
}
