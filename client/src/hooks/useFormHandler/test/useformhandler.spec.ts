import { renderHook, act } from "@testing-library/react-hooks";
import useFormHandler from "..";
import { FormStateI } from "../../../types";

const inititalState: FormStateI = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
};

describe("useFormHandler hook", () => {
  it("it should render with an initialState", () => {
    const {
      result: {
        current: { state },
      },
    } = renderHook(() => useFormHandler());

    expect(state).toEqual(inititalState);
  });

  it("it should handle state change", () => {
    const { result } = renderHook(() => useFormHandler());

    act(() => {
      result.current.handleChange("firstNameValue", "firstName");
    });

    expect(result.current.state).toEqual({
      ...inititalState,
      firstName: "firstNameValue",
    });
  });
});
