import React, { useContext, createContext, useReducer, useEffect } from "react";
import { Toast } from "../utils";
import { FetchDispatchTypes } from "./authActions";
import authReducer, { StateI, initialState } from "./authReducer";

interface AuthStateValuesI {
  state: StateI;
}

interface AuthDispatchI {
  dispatch: React.Dispatch<FetchDispatchTypes> | null;
}

export const AuthStateContext = createContext<AuthStateValuesI>({
  state: initialState,
});

const AuthDispatchContext = createContext<AuthDispatchI>({ dispatch: null });

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.error) {
      Toast.fire({
        text: state.error,
        icon: "error",
      });
    }
  }, [state.error]);

  return (
    <AuthDispatchContext.Provider value={{ dispatch }}>
      <AuthStateContext.Provider value={{ state }}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
