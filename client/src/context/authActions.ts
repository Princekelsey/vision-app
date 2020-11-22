import { UserI } from "../types";

export const PENDING = "PENDING";
export const DONE = "DONE";
export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";

export interface DoneI {
  type: typeof DONE;
  payload: UserI;
}

export interface PendingI {
  type: typeof PENDING;
}

export interface LogoutI {
  type: typeof LOGOUT;
}

export interface ErrorI {
  type: typeof ERROR;
  payload: any;
}

export type FetchDispatchTypes = DoneI | PendingI | ErrorI | LogoutI;
