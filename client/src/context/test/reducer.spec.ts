import {
  PENDING,
  DONE,
  ERROR,
  LOGOUT,
  FetchDispatchTypes,
} from "../authActions";
import authReducer, { initialState, StateI } from "../authReducer";

describe("AuthContext reducer", () => {
  let action: FetchDispatchTypes;
  let expected: StateI;

  it("it should set isLoading to true on PENDING action", () => {
    action = {
      type: PENDING,
    };
    expected = {
      ...initialState,
      isLoading: true,
    };

    const actual = authReducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it("it should return user when DONE action", () => {
    action = {
      type: DONE,
      payload: {
        firstName: "Test",
        lastName: "testlastName",
        password: "123456",
        id: 1,
        email: "test@gmail.com",
        createdAt: "12-12-20",
        updatedAt: "12-12-20",
      },
    };

    expected = {
      ...initialState,
      currentUser: action.payload,
    };

    const actual = authReducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it("it should set currentUser to null when LOGOUT action", () => {
    action = {
      type: LOGOUT,
    };

    expected = {
      ...initialState,
      currentUser: null,
    };

    const actual = authReducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it("it should set error  when ERROR action", () => {
    action = {
      type: ERROR,
      payload: "Something went wrong",
    };

    expected = {
      ...initialState,
      error: action.payload,
    };

    const actual = authReducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
