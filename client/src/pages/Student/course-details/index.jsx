import { StudentContext } from "@/context/student-context";
import React, { useContext } from "react";

const StudentViewCourseDetailsPage = () => {
  const { courseDetails, setCourseDetails } = useContext(StudentContext);

  return <div>StudentViewCourseDetailsPage</div>;
};

export default StudentViewCourseDetailsPage;
