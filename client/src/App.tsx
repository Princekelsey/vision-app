import React, { useState } from "react";

import PanelControl from "./components/PanelControl";
import MainPage from "./pages/MainPage";

import "./App.css";
import { useAuthState } from "./context/authContext";

const App: React.FC = () => {
  const [currentMode, setMode] = useState("");

  const setCurrentMode = (mode: string): void => {
    setMode(mode);
  };

  const { state } = useAuthState();

  return (
    <div className={`container ${currentMode}`} data-testid="app">
      <MainPage />
      {!state.currentUser && <PanelControl setCurrentMode={setCurrentMode} />}
    </div>
  );
};

export default App;
