import axiosInstance from "@/api/axiosInstance";
import axios from "axios";

export const registerService = async (formData) => {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });
  return data;
};

export const loginService = async (formData) => {
  console.log(formData);
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
};

export const checkAuthService = async () => {
  const { data } = await axiosInstance.get("/auth/check-auth");
  return data;
};

export const uploadMedia = async (formData, onProgressCallback) => {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
};

export const deleteMedia = async (id) => {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  return data;
};

export const addCourseService = async (formData) => {
  const { data } = await axiosInstance.post("/instructor/course/add", formData);
  return data;
};

export const getAllCourseService = async () => {
  const { data } = await axiosInstance.get("/instructor/course/get");
  return data;
};

export const getCourseDetailsService = async (id) => {
  const { data } = await axiosInstance.get(
    `/instructor/course/get-course-details/${id}`
  );
  return data;
};

export const updateCourseService = async (id, formData) => {
  const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, {
    updatedCourseData: formData,
  });
  return data;
};

export const bulkUploadMediaService = async (formData, onProgressCallback) => {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
};

export const studentViewGetAllCourseService = async (query) => {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);
  return data;
};

export const studentViewGetCourseDetailsService = async (id) => {
  const { data } = await axiosInstance.get(`/student/course/get-details/${id}`);
  return data;
};

export const studentViewCreateOrder = async (formData) => {
  const { data } = await axiosInstance.post("/student/order/create", formData);
  return data;
};

export const studentViewFinalizeOrder = async ({
  paymentId,
  payerId,
  orderId,
}) => {
  const { data } = await axiosInstance.post("/student/order/finalize", {
    paymentId,
    payerId,
    orderId,
  });
  return data;
};

export const studentViewBoughtCoursesService = async (studentId) => {
  const { data } = await axiosInstance.get(
    `/student/bought-course/getCourses/${studentId}`
  );
  return data;
};

export const checkCoursePurchaseInfoService = async (courseId, studentId) => {
  const { data } = await axiosInstance.get(
    `/student/course/check-purchase/${courseId}/${studentId}`
  );
  return data;
};

export const studentgetCurrentCourseProgressService = async (
  userId,
  courseId
) => {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );
  return data;
};
