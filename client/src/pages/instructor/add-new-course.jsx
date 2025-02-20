import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/course-landing-page";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { useToast } from "@/hooks/use-toast";
import { addCourseService } from "@/services";
import React, { useContext } from "react";

const AddNewCourse = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);
  const { toast } = useToast();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    return hasFreePreview;
  }

  const handleCourseSubmit = async () => {
    const allFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response = await addCourseService(allFormData);
    console.log(response);
    if (response?.success) {
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingInitialFormData);
      toast({
        title: response?.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-extrabold text-3xl">Create New Course</h1>
        <Button className="text-lg px-6" onClick={handleCourseSubmit}>
          Submit
        </Button>
      </div>
      <Card className="p-8">
        <CardContent>
          <Tabs defaultValue="curriculum" className="">
            <TabsList className="grid grid-cols-3 mb-4 max-w-[500px]">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="course-landing-page">
                Course Landing Page
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum">
              <CourseCurriculum />
            </TabsContent>
            <TabsContent value="course-landing-page">
              <CourseLandingPage />
            </TabsContent>
            <TabsContent value="settings">
              <CourseSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;
