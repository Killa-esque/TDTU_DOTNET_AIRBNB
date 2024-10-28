// src/hooks/useRouteCustom.tsx
import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { AdminTemplate, UserTemplate, AccountSettingTemplate, HostTemplate } from "@/templates";
import Loading from "@/components/Common/Loading";
import ROUTES from "@/constants/routes";
import ProtectedRoute from "@/components/Common/ProtectedRoute";

// Admin
const AdminDashboard = React.lazy(() => import('@/pages/Admin/DashBoard'));
const LocationManagementPage = React.lazy(() => import('@/pages/Admin/Location'));
const RoomManagementPage = React.lazy(() => import('@/pages/Admin/Room'));
const UserManagementPage = React.lazy(() => import('@/pages/Admin/User'));
const AdminProfilePage = React.lazy(() => import('@/pages/Admin/Profile'));
const AdminLoginPage = React.lazy(() => import('@/pages/Admin/Login'));
const RevenueAdminPage = React.lazy(() => import('@/pages/Admin/Revenue'));
const SupportManagementPage = React.lazy(() => import('@/pages/Admin/Support'));

// Host
const HostHomePage = React.lazy(() => import('@/pages/Host/Home'));
const HostProfilePage = React.lazy(() => import('@/pages/Host/Profile'));
const RevenueHostPage = React.lazy(() => import('@/pages/Host/Revenue'));
const AirBnBManagementPage = React.lazy(() => import('@/pages/Host/AirBnB'));
const HostListingsPage = React.lazy(() => import('@/pages/Host/Listings'));
const HostMessagePage = React.lazy(() => import('@/pages/Host/Message'));
const AnalysisPage = React.lazy(() => import('@/pages/Host/Analysis'));

// User
const HomePage = React.lazy(() => import('@/pages/User/Home'));
const PersonalInfoPage = React.lazy(() => import('@/pages/User/PersonalInfo'));
const DetailPage = React.lazy(() => import('@/pages/User/Detail'));
const SearchPage = React.lazy(() => import('@/pages/User/Search'));
const BookingPage = React.lazy(() => import('@/pages/User/Booking'));
const BookingHistoryPage = React.lazy(() => import('@/pages/User/BookingHistory'));
const FavouritesPage = React.lazy(() => import('@/pages/User/Favourites'));
const LoginSecurityPage = React.lazy(() => import('@/pages/User/LoginSecurity'));
const ReservationPage = React.lazy(() => import('@/pages/User/Reservation'));
const SavedPage = React.lazy(() => import('@/pages/User/Saved'));
const AccountSettingPage = React.lazy(() => import('@/pages/User/AccountSetting'));

// Trang 404 Not Found
const NotFoundPage = React.lazy(() => import('@/pages/Public/NotFound'));
const UnauthorizedPage = React.lazy(() => import('@/pages/Public/UnauthorizedPage'));

const useRouteCustom = () => {

  const routes = [
    {
      path: ROUTES.HOME,
      element: (
        // <ProtectedRoute allowedRoles={["USER", "GUEST"]}>
        <UserTemplate />
        // </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
        {
          path: ROUTES.ACCOUNT_SETTING,
          element: (
            // <ProtectedRoute allowedRoles={["USER"]}>
            <AccountSettingTemplate />
            // </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Suspense fallback={<Loading />}><AccountSettingPage /></Suspense> },
            { path: ROUTES.USER_PROFILE, element: <Suspense fallback={<Loading />}><PersonalInfoPage /></Suspense> },
            { path: ROUTES.LOGIN_SECURITY, element: <Suspense fallback={<Loading />}><LoginSecurityPage /></Suspense> },
            { path: ROUTES.RESERVATION, element: <Suspense fallback={<Loading />}><ReservationPage /></Suspense> },
            { path: ROUTES.SAVED, element: <Suspense fallback={<Loading />}><SavedPage /></Suspense> },
            { path: ROUTES.FAVORITES, element: <Suspense fallback={<Loading />}><FavouritesPage /></Suspense> },
            { path: ROUTES.BOOKING_HISTORY, element: <Suspense fallback={<Loading />}><BookingHistoryPage /></Suspense> },
          ],
        },
        { path: ROUTES.ROOM_DETAIL, element: <ProtectedRoute allowedRoles={["USER", "GUEST"]}> <Suspense fallback={<Loading />}><DetailPage /></Suspense> </ProtectedRoute> },
        { path: ROUTES.SEARCH, element: <ProtectedRoute allowedRoles={["USER", "GUEST"]}> <Suspense fallback={<Loading />}><SearchPage /></Suspense> </ProtectedRoute> },
        { path: ROUTES.BOOKING, element: <ProtectedRoute allowedRoles={["USER"]}> <Suspense fallback={<Loading />}><BookingPage /></Suspense> </ProtectedRoute> },
      ]
    },
    {
      path: ROUTES.HOST_HOME,
      element: <HostTemplate />,
      children: [
        { index: true, element: <Suspense fallback={<Loading />}><HostHomePage /></Suspense> },
        { path: ROUTES.HOST_AIRBNB_MANAGEMENT, element: <Suspense fallback={<Loading />}><AirBnBManagementPage /></Suspense> },
        { path: ROUTES.HOST_REVENUE, element: <Suspense fallback={<Loading />}><RevenueHostPage /></Suspense> },
        { path: ROUTES.HOST_PROFILE, element: <Suspense fallback={<Loading />}><HostProfilePage /></Suspense> },
        { path: ROUTES.HOST_LISTINGS, element: <Suspense fallback={<Loading />}><HostListingsPage /></Suspense> },
        { path: ROUTES.HOST_MESSAGES, element: <Suspense fallback={<Loading />}><HostMessagePage /></Suspense> },
        { path: ROUTES.HOST_ANALYSIS, element: <Suspense fallback={<Loading />}><AnalysisPage /></Suspense> },
      ],
    },
    {
      path: ROUTES.ADMIN_DASHBOARD,
      element: (
        // <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminTemplate />
        // </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Suspense fallback={<Loading />}><AdminDashboard /></Suspense> },
        { path: ROUTES.ADMIN_DASHBOARD, element: <Suspense fallback={<Loading />}><LocationManagementPage /></Suspense> },
        { path: ROUTES.ADMIN_ROOM_MANAGEMENT, element: <Suspense fallback={<Loading />}><RoomManagementPage /></Suspense> },
        { path: ROUTES.ADMIN_USER_MANAGEMENT, element: <Suspense fallback={<Loading />}><UserManagementPage /></Suspense> },
        { path: ROUTES.ADMIN_REVENUE, element: <Suspense fallback={<Loading />}><RevenueAdminPage /></Suspense> },
        { path: ROUTES.ADMIN_PROFILE, element: <Suspense fallback={<Loading />}><AdminProfilePage /></Suspense> },
        { path: ROUTES.ADMIN_SUPPORT_MANAGEMENT, element: <Suspense fallback={<Loading />}><SupportManagementPage /></Suspense> },
        { path: ROUTES.ADMIN_LOCATION_MANAGEMENT, element: <Suspense fallback={<Loading />}><LocationManagementPage /></Suspense> },
      ]
    },
    { path: ROUTES.ADMIN_LOGIN, element: <Suspense fallback={<Loading />}><AdminLoginPage /></Suspense> },
    { path: ROUTES.UNAUTHORIZED, element: <Suspense fallback={<Loading />}><UnauthorizedPage /></Suspense> },
    { path: ROUTES.NOT_FOUND, element: <Suspense fallback={<Loading />}><NotFoundPage /></Suspense> },
  ]



  return useRoutes(routes);
};

export default useRouteCustom;
