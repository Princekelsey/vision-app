import { useState } from "react";
import { FormStateI } from "../../types";

const useFormHandler = () => {
  const [state, setState] = useState<FormStateI>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (value: string, name: string): void => {
    setState({ ...state, [name]: value });
  };

  return {
    state,
    handleChange,
  };
};

export default useFormHandler;
