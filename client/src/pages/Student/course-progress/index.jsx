import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { studentgetCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentViewCourseProgressPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);

  const fetchCurrentCourseProgress = async () => {
    const response = await studentgetCurrentCourseProgressService(
      auth?.user?._id,
      courseId
    );
    console.log(response);
  };

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [courseId]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {/* {showConfetti && <Confetti />} */}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-paid-courses")}
            className="text-black bg-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {/* {studentCurrentCourseProgress?.courseDetails?.title} */} title
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StudentViewCourseProgressPage;
