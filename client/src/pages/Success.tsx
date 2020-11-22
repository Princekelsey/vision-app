import React from "react";
import { LOGOUT } from "../context/authActions";
import { useAuthState, useAuthDispatch } from "../context/authContext";

const Success: React.FC = () => {
  const {
    state: { currentUser },
  } = useAuthState();

  const { dispatch } = useAuthDispatch();

  const logout = () => (dispatch ? dispatch({ type: LOGOUT }) : null);

  return (
    <div className="success-content">
      <h1 className="title">{`Yay ${currentUser?.firstName}, you’re logged in!`}</h1>
      <p>Thank you for joining us. Enjoy your ride!</p>
      <div className="content">
        <button className="btn" id="sign-in-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Success;
