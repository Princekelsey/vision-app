import React from "react";
import loginImage from "../assets/image/log.svg";
import signUpImage from "../assets/image/register.svg";

interface Props {
  setCurrentMode: (mode: string) => void;
}

const PanelControl: React.FC<Props> = ({ setCurrentMode }) => {
  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>New here ?</h3>
          <p>Create an account to join the flight</p>
          <button
            className="btn transparent"
            id="sign-up-btn"
            onClick={() => setCurrentMode("sign-up-mode")}
          >
            Sign up
          </button>
        </div>
        <img src={loginImage} className="image" alt="Login" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>One of us ?</h3>
          <p>Sign in to your vision account</p>
          <button
            className="btn transparent"
            id="sign-in-btn"
            onClick={() => setCurrentMode("sign-in-mode")}
          >
            Sign in
          </button>
        </div>
        <img src={signUpImage} className="image" alt="SignUp" />
      </div>
    </div>
  );
};

export default PanelControl;
