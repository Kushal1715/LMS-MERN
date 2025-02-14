import CommonForm from "@/components/common-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import React, { useContext } from "react";

const CourseLandingPage = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
          formControls={courseLandingPageFormControls}
        />
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
