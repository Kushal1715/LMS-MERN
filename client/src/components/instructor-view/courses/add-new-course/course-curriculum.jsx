import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { deleteMedia, uploadMedia } from "@/services";
import { Upload } from "lucide-react";
import React, { useContext, useRef } from "react";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPrecentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const bulkUploadRef = useRef(null);

  const handleAddLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  };

  const handleTitleChange = (event, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleSwitch = (value, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleSingleLectureUpload = async (event, currentIndex) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      try {
        setMediaUploadProgress(true);
        const response = await uploadMedia(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        console.log(response);
        if (response?.success) {
          let copyCourseCurriculumFormData = [...courseCurriculumFormData];
          copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(copyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAddLectureButton = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  const handleDeleteLecture = async (currentIndex) => {
    try {
      const copyCourseCurriculumFormData = [...courseCurriculumFormData];
      const publicId = copyCourseCurriculumFormData[currentIndex]?.public_id;
      const response = await deleteMedia(publicId);
      console.log(response);
      if (response?.success) {
        copyCourseCurriculumFormData[currentIndex] = {
          ...copyCourseCurriculumFormData[currentIndex],
          videoUrl: "",
          public_id: "",
        };
        setCourseCurriculumFormData(copyCourseCurriculumFormData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBulkUpload = () => {
    bulkUploadRef.current?.click();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            className="hidden"
            accept="video/*"
            type="file"
            multiple
            id="bulk-upload"
            ref={bulkUploadRef}
          />
          <Button as="label" htmlFor="bulk-upload" onClick={handleBulkUpload}>
            <Upload /> Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAddLecture} disabled={!handleAddLectureButton()}>
          Add Lecture
        </Button>
        {mediaUploadProgress ? (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPrecentage}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((formData, index) => (
            <Card className="p-6" key={index}>
              <CardContent>
                <div className="flex justify-between items-center w-full">
                  <div className="">
                    <Label className="text-lg font-bold">
                      Lecture {index + 1}
                    </Label>
                    <Input
                      type="text"
                      placeholder={`Enter lecture ${index + 1} title`}
                      name={`lecture ${index + 1}`}
                      className="max-w-80 lg:w-80"
                      onChange={(event) => handleTitleChange(event, index)}
                      value={courseCurriculumFormData[index]?.title}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`lecture ${index + 1}`}
                      onCheckedChange={(value) => handleSwitch(value, index)}
                      checked={courseCurriculumFormData[index]?.freePreview}
                    />
                    <Label htmlFor={`lecture ${index + 1}`}>Free Preview</Label>
                  </div>
                </div>
                <div className="mt-6">
                  {courseCurriculumFormData[index]?.videoUrl ? (
                    <div className="flex gap-3">
                      <VideoPlayer
                        url={courseCurriculumFormData[index]?.videoUrl}
                      />
                      <Button onClick={() => handleDeleteLecture(index)}>
                        Replace Video
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-600"
                        onClick={() => handleDeleteLecture(index)}
                      >
                        Delete Lecture
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="video/*"
                      className="cursor-pointer"
                      onChange={(event) =>
                        handleSingleLectureUpload(event, index)
                      }
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
