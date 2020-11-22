import React from "react";
import { useAuthDispatch } from "../context/authContext";
import useFetch from "../hooks/useFetch";
import useFormHandler from "../hooks/useFormHandler";
import { MySwal } from "../utils";

const SignUp = () => {
  const {
    state: { email, password, firstName, lastName },
    handleChange,
  } = useFormHandler();

  const { dispatch } = useAuthDispatch();

  const { doSend } = useFetch(
    null,
    { email, password, firstName, lastName },
    dispatch
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    handleChange(value, name);
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName) return;

    if (password.length < 6) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be greater or equal to 6",
      });
      return;
    }

    doSend("/api/v1/users/register", { email, password, firstName, lastName });
  };

  return (
    <form className="sign-up-form" onSubmit={handleSignUp}>
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          name="firstName"
          onChange={onChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          name="lastName"
          onChange={onChange}
        />
      </div>
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
      <input type="submit" className="btn" value="Sign up" />
    </form>
  );
};

export default SignUp;
