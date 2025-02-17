import MediaProgressbar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { uploadMedia } from "@/services";
import React, { useContext } from "react";

const CourseSettings = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPrecentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);
  const handleImageUploadChange = async (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await uploadMedia(
          imageFormData,
          setMediaUploadProgressPercentage
        );
        console.log(response);
        if (response?.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.data?.url,
          });
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  console.log(courseLandingFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {courseLandingFormData.image !== "" ? (
          <img src={courseLandingFormData?.image} />
        ) : (
          <div>
            <Label>Upload Course Image</Label>
            {mediaUploadProgress ? (
              <MediaProgressbar
                isMediaUploading={mediaUploadProgress}
                progress={mediaUploadProgressPrecentage}
              />
            ) : null}
            <Input
              type="file"
              accept="image/*"
              className="mt-4 cursor-pointer"
              onChange={handleImageUploadChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
