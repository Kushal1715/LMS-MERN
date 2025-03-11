import { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState(null);
  const [studentBoughtCourses, setStudentBoughtCourses] = useState([]);
  return (
    <StudentContext.Provider
      value={{
        studentCourseList,
        setStudentCourseList,
        loading,
        setLoading,
        courseDetails,
        setCourseDetails,
        studentBoughtCourses,
        setStudentBoughtCourses,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
