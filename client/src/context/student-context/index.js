import { createContext } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  return (
    <StudentContext.Provider value={{}}>{children}</StudentContext.Provider>
  );
};

export default StudentProvider;
