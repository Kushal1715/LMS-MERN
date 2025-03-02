import { Skeleton } from "@/components/ui/skeleton";
import { StudentContext } from "@/context/student-context";
import { studentViewGetCourseDetailsService } from "@/services";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentViewCourseDetailsPage = () => {
  const { courseDetails, setCourseDetails, loading, setLoading } =
    useContext(StudentContext);
  const params = useParams();

  const fetchCourseDetails = async (courseId) => {
    const response = await studentViewGetCourseDetailsService(courseId);
    if (response?.success) {
      setCourseDetails(response);
      setLoading(false);
    } else {
      setCourseDetails(null);
      setLoading(false);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchCourseDetails(params.id);
  }, [params]);

  if (loading) {
    return <Skeleton />;
  }

  return <div>StudentViewCourseDetailsPage</div>;
};

export default StudentViewCourseDetailsPage;
