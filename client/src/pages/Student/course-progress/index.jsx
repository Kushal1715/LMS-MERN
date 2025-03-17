import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { studentgetCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentViewCourseProgressPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchCurrentCourseProgress = async () => {
    const response = await studentgetCurrentCourseProgressService(
      auth?.user?._id,
      courseId
    );

    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });
      }

      if (response?.data?.completed) {
        setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        setShowCourseCompleteDialog(true);
        setShowConfetti(true);
        return;
      }
    }
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
