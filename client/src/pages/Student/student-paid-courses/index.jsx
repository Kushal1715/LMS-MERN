import { StudentContext } from "@/context/student-context";
import React, { useContext, useEffect } from "react";

const StudentPaidCourses = () => {
  const { studentBoughtCourses, setStudentBoughtCourses } =
    useContext(StudentContext);

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);
  return <div>StudentPaidCourses</div>;
};

export default StudentPaidCourses;
