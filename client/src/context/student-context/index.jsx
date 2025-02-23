import { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  return (
    <StudentContext.Provider
      value={{ studentCourseList, setStudentCourseList }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
