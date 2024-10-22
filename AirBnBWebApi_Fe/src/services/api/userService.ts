import API_ENDPOINTS from "@/constants/apiEndpoints";
import axiosClient from "../axiosClient";
import { storage } from "@/utils";

const userService = {
  getProfile: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  getBookings: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.BOOKINGS);
    return response.data;
  },

  getFavorites: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.FAVORITES);
    return response.data;
  },
};

export default userService;
