import { CONFIG } from "@/config/appConfig";

const BASE_URL = CONFIG.API.BASE_URL;

const API_ENDPOINTS = {
  // User Endpoints
  USER: {
    PROFILE: `${BASE_URL}/account-setting/personal-info`,
    BOOKINGS: `${BASE_URL}/account-setting/reservation`,
    FAVORITES: `${BASE_URL}/account-setting/favorites`,
    LOGIN_SECURITY: `${BASE_URL}/account-setting/login-and-security`,
    ACCOUNT_SETTING: `${BASE_URL}/account-setting`,
  },

  // Host Endpoints
  HOST: {
    DASHBOARD: `${BASE_URL}/host/dashboard`,
    AIRBNB_MANAGEMENT: `${BASE_URL}/host/airbnb`,
    BOOKING_REQUESTS: `${BASE_URL}/host/booking-requests`,
    REVENUE: `${BASE_URL}/host/revenue`,
    PROFILE: `${BASE_URL}/host/profile`,
  },

  // Admin Endpoints
  ADMIN: {
    DASHBOARD: `${BASE_URL}/admin/dashboard`,
    LOCATION_MANAGEMENT: `${BASE_URL}/admin/location`,
    ROOM_MANAGEMENT: `${BASE_URL}/admin/room`,
    USER_MANAGEMENT: `${BASE_URL}/admin/users`,
    REVENUE: `${BASE_URL}/admin/revenue`,
    SUPPORT_MANAGEMENT: `${BASE_URL}/admin/support`,
  },

  // Auth Endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
};

export default API_ENDPOINTS;
