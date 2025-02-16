import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import React, { useContext } from "react";

const CourseCurriculum = () => {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);

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

  console.log(courseCurriculumFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAddLecture}>Add Lecture</Button>
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
                  <Input
                    type="file"
                    accept="/video*"
                    className="cursor-pointer"
                  />
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
