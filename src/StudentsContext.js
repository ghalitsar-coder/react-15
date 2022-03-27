import { createContext, useState } from "react";

export const StudentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  
  
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  return (
    <StudentsContext.Provider
      value={{ students, setStudents, showAlert, alert }}
    >
      {props.children}
    </StudentsContext.Provider>
  );
};
