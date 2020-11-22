import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { AuthStateContext } from "../authContext";
import { StateI } from "../authReducer";
import Success from "../../pages/Success";

const mockState: StateI = {
  currentUser: {
    firstName: "Test",
    lastName: "testlastName",
    password: "123456",
    id: 1,
    email: "test@gmail.com",
    createdAt: "12-12-20",
    updatedAt: "12-12-20",
  },
  error: null,
  isLoading: false,
};

afterAll(cleanup);

describe("AuthContext", () => {
  it("it renders success component and current user firstname on successfull login", () => {
    render(
      <AuthStateContext.Provider value={{ state: mockState }}>
        <Success />
      </AuthStateContext.Provider>
    );
    expect(
      screen.getByText(
        `Yay ${mockState.currentUser?.firstName}, you’re logged in!`
      )
    ).toBeInTheDocument();
  });
});
