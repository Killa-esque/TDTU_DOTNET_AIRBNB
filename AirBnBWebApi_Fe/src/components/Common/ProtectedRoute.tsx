import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import ROUTES from '@/constants/routes';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Lấy route trước đó từ local storage hoặc từ state tùy thuộc vào cách lưu trữ bạn chọn.
  const previousRoute = location.pathname;

  // Lưu trữ route hiện tại mỗi khi người dùng chuyển trang (không lưu các trang không được phép)
  React.useEffect(() => {
    if (user && allowedRoles.includes(user.role)) {
      localStorage.setItem('previousRoute', location.pathname);
    }
  }, [location.pathname, allowedRoles, user]);

  // Nếu user chưa đăng nhập và route yêu cầu quyền không phải là guest, chuyển đến trang login
  if (!user && !allowedRoles.includes('GUEST')) {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }

  // Nếu user đã đăng nhập nhưng không có vai trò phù hợp, điều hướng về route trước đó
  if (user && !allowedRoles.includes(user.role)) {

    return <Navigate to={ROUTES.UNAUTHORIZED} replace={true} state={{ from: "/" }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
