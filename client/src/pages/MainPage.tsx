import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useAuthState } from "../context/authContext";
import Success from "./Success";

const MainPage: React.FC = () => {
  const { state } = useAuthState();

  return (
    <div className="forms-container">
      <div className="signin-signup">
        {state.currentUser ? (
          <Success />
        ) : (
          <>
            {" "}
            <SignIn />
            <SignUp />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
