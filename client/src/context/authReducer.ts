import {
  PENDING,
  DONE,
  ERROR,
  FetchDispatchTypes,
  LOGOUT,
} from "./authActions";
import { UserI } from "../types";

export interface StateI {
  error: any;
  isLoading: boolean;
  currentUser: null | UserI;
}

export const initialState: StateI = {
  error: null,
  currentUser: null,
  isLoading: false,
};

const authReducer = (
  state: StateI = initialState,
  action: FetchDispatchTypes
) => {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        error: null,
        currentUser: null,
        isLoading: true,
      };
    case DONE:
      return {
        ...state,
        error: null,
        isLoading: false,
        currentUser: action.payload,
      };

    case LOGOUT: {
      return {
        ...state,
        error: null,
        isLoading: false,
        currentUser: null,
      };
    }
    case ERROR:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
