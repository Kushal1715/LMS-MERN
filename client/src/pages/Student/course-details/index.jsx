import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  studentViewCreateOrder,
  studentViewGetCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, PlayCircle, Lock } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CourseDetailsPage = () => {
  const { courseDetails, setCourseDetails, loading, setLoading } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails(courseId) {
    const response = await studentViewGetCourseDetailsService(courseId);

    if (response?.success) {
      setCourseDetails(response?.data);
    } else {
      setCourseDetails(null);
    }
    setLoading(false);
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  const handlePayment = async () => {
    const payloadData = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.email,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: courseDetails?.instructorId,
      instructorName: courseDetails?.instructorName,
      courseImage: courseDetails?.image,
      courseTitle: courseDetails?.title,
      courseId: courseDetails?._id,
      coursePricing: courseDetails?.pricing,
    };

    const response = await studentViewCreateOrder(payloadData);
    console.log(response);

    if (response?.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  };

  console.log(auth);
  console.log(courseDetails);

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    fetchStudentViewCourseDetails(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details")) setCourseDetails(null);
  }, [location.pathname]);

  if (loading) return <Skeleton />;
  if (approvalUrl) window.location.href = approvalUrl;

  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">{courseDetails?.title}</h1>
        <p className="text-xl mb-4">{courseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {courseDetails?.instructorName}</span>
          <span>Created On {courseDetails?.date?.split("T")[0]}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {courseDetails?.primaryLanguage}
          </span>
          <span>
            {courseDetails?.students.length}{" "}
            {courseDetails?.students.length <= 1 ? "Student" : "Students"}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {courseDetails?.objectives
                  ?.split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {courseDetails?.curriculum?.map((curriculumItem, index) => (
                <li
                  key={index}
                  className={`flex items-center mb-4 ${
                    curriculumItem?.freePreview
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={
                    curriculumItem?.freePreview
                      ? () => handleSetFreePreview(curriculumItem)
                      : null
                  }
                >
                  {curriculumItem?.freePreview ? (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Lock className="mr-2 h-4 w-4" />
                  )}
                  <span>{curriculumItem?.title}</span>
                </li>
              ))}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <h1 className="font-bold text-3xl">Demo Video:</h1>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    courseDetails?.curriculum?.find((item) => item.freePreview)
                      ?.videoUrl || ""
                  }
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${courseDetails?.pricing}
                </span>
              </div>
              <Button className="w-full" onClick={handlePayment}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
