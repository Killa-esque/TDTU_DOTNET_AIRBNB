import API_ENDPOINTS from "@/constants/apiEndpoints";
import axiosClient from "../axiosClient";
import { LoginPayload, RegisterPayload } from "@/types";
import { storage } from "@/utils";

const userService = {
  register: async (userData: RegisterPayload) => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  login: async (credentials: LoginPayload) => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  logout: async () => {
    storage.remove("user");
  },
};

export default userService;
