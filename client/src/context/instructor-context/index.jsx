import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

const InstuctorProvider = ({ children }) => {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);

  const [mediaUploadProgressPrecentage, setMediaUploadProgressPercentage] =
    useState(0);

  const [instructorCourseList, setInstructorCourseList] = useState([]);

  const [editCourseId, setEditCourseId] = useState(null);
  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPrecentage,
        setMediaUploadProgressPercentage,
        instructorCourseList,
        setInstructorCourseList,
        editCourseId,
        setEditCourseId,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

export default InstuctorProvider;
