import axiosInstance from "@/api/axiosInstance";

export const registerService = async (formData) => {
  const response = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });
  return response;
};
