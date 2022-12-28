import React, { useReducer, createContext, useEffect } from "react";

export const DarkmodeContext = createContext();

const initialState = {
  mode: JSON.parse(localStorage.getItem("darkmode"))?.mode || "light",
  shades: JSON.parse(localStorage.getItem("darkmode"))?.shades || {
    primary: "#fff",
    secondary: "#000",
    tertiary: "#000",
  },
};

const reducer = (state = initialState, action) => {
  let newmode;
  switch (action.type) {
    case "MAKE_DARK":
      newmode = {
        mode: "dark",
        shades: {
          primary: "#1f1f1f",
          secondary: "#fff",
          tertiary: "#fff",
        },
      };
      localStorage.setItem("darkmode", JSON.stringify(newmode));
      return newmode;

    case "MAKE_LIGHT":
      newmode = {
        mode: "light",
        shades: {
          primary: "#c7dbef",
          secondary: "#000",
          tertiary: "#000",
        },
      };
      localStorage.setItem("darkmode", JSON.stringify(newmode));
      return newmode;

    default:
      return state;
  }
};

export const DarkmodeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state, "change in darkmode");
  }, [state]);
  return (
    <DarkmodeContext.Provider value={[state, dispatch]}>
      {children}
    </DarkmodeContext.Provider>
  );
};
