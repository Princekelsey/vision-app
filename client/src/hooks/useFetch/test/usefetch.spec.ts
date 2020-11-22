import { renderHook, act } from "@testing-library/react-hooks";
import { FetchDispatchTypes } from "../../../context/authActions";
import { LoginDataI, SignUpDataI } from "../../../types";
import useFetch from "../index";

jest.mock("../agent");
const fakeAgent = require("../agent");

const mockSignUpData: SignUpDataI = {
  firstName: "testFirstName",
  lastName: "testLastName",
  email: "test@gmail.com",
  password: "123456",
};

const mockLoginData: LoginDataI = {
  email: "test@gmail.com",
  password: "123456",
};

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("useFetch hook", () => {
  let requestUrl: string | null | undefined;
  let postData: LoginDataI | SignUpDataI;
  let dispatch: React.Dispatch<FetchDispatchTypes> | null;

  it("should NOT make any POST calls if URL is not provided", () => {
    requestUrl = null;
    postData = mockLoginData;
    dispatch = null;
    fakeAgent.default.post.mockResolvedValue({ body: "postData" });
    renderHook(() => useFetch(requestUrl, postData, dispatch));

    expect(fakeAgent.default.post).not.toHaveBeenCalled();
  });

  it("should make a POST call on doSend request", () => {
    const postUrl = "postUrl";
    postData = mockSignUpData;
    dispatch = null;
    fakeAgent.default.post.mockResolvedValue({ body: "postData" });
    const {
      result: { current },
    } = renderHook(() => useFetch(null, postData, null));

    act(() => current.doSend(postUrl, mockSignUpData));

    expect(fakeAgent.default.post).toHaveBeenCalledWith({
      url: postUrl,
      data: mockSignUpData,
      config: { timeout: 1000 },
    });
  });
});
