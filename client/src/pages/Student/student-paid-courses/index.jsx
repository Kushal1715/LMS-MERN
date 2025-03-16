import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { studentViewBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentPaidCourses = () => {
  const { studentBoughtCourses, setStudentBoughtCourses } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchStudentBoughtCourses = async () => {
    const response = await studentViewBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCourses(response?.data?.courses);
    }
  };

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);
  console.log(studentBoughtCourses);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCourses && studentBoughtCourses.length > 0 ? (
          studentBoughtCourses.map((course) => (
            <Card key={course._id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses found</h1>
        )}
      </div>
    </div>
  );
};

export default StudentPaidCourses;
