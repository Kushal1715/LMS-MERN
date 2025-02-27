import { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <StudentContext.Provider
      value={{ studentCourseList, setStudentCourseList, loading, setLoading }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
