// src/constants/routes.ts
const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT_SETTING: "/account-setting",
  USER_PROFILE: "personal-info",
  LOGIN_SECURITY: "login-security",
  RESERVATION: "reservation",

  ROOM_DETAIL: "/room-detail/:roomId",
  SEARCH: "search",
  BOOKING: "/booking",
  BOOKING_HISTORY: "booking-history",
  FAVORITES: "favorites",
  SAVED: "saved",

  // Admin routes
  ADMIN_DASHBOARD: "/admin",
  ADMIN_LOCATION_MANAGEMENT: "location-management",
  ADMIN_ROOM_MANAGEMENT: "room-management",
  ADMIN_USER_MANAGEMENT: "user-management",
  ADMIN_REVENUE: "revenue",
  ADMIN_PROFILE: "profile",
  ADMIN_SUPPORT_MANAGEMENT: "support-management",
  ADMIN_LOGIN: "/admin-login",

  // Host routes
  HOST_HOME: "/host",
  HOST_AIRBNB_MANAGEMENT: "airbnb-management",
  HOST_BOOKING_REQUESTS: "booking-requests",
  HOST_REVENUE: "revenue",
  HOST_PROFILE: "profile",
  HOST_ANALYSIS: "analysis",
  HOST_CREATE_NEW_LISTING: "create-new-airbnb",
  HOST_MESSAGES: "messages",
  HOST_LISTINGS: "listings",

  // Not Found
  NOT_FOUND: "*",

  UNAUTHORIZED: "/unauthorized",
};

export default ROUTES;


