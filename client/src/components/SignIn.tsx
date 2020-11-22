import React from "react";
import { useAuthDispatch } from "../context/authContext";
import useFetch from "../hooks/useFetch";
import useFormHandler from "../hooks/useFormHandler";

const SignIn: React.FC = () => {
  const {
    state: { email, password },
    handleChange,
  } = useFormHandler();

  const { dispatch } = useAuthDispatch();

  const { doSend } = useFetch(null, { email, password }, dispatch);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email) return;

    doSend("/api/v1/users/login", { email, password });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    handleChange(value, name);
  };

  return (
    <form className="sign-in-form" onSubmit={handleSignIn}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={onChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={onChange}
        />
      </div>
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
};

export default SignIn;
