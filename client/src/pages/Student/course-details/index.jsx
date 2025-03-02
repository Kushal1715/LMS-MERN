import { StudentContext } from "@/context/student-context";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentViewCourseDetailsPage = () => {
  const { courseDetails, setCourseDetails } = useContext(StudentContext);
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, [params]);

  return <div>StudentViewCourseDetailsPage</div>;
};

export default StudentViewCourseDetailsPage;
