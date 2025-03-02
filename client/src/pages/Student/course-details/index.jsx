import { StudentContext } from "@/context/student-context";
import { studentViewGetCourseDetailsService } from "@/services";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentViewCourseDetailsPage = () => {
  const { courseDetails, setCourseDetails } = useContext(StudentContext);
  const params = useParams();

  const fetchCourseDetails = async (courseId) => {
    const response = await studentViewGetCourseDetailsService(courseId);
    if (response?.success) {
      setCourseDetails(response);
    } else {
      setCourseDetails(null);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchCourseDetails(params.id);
  }, [params]);

  return <div>StudentViewCourseDetailsPage</div>;
};

export default StudentViewCourseDetailsPage;
