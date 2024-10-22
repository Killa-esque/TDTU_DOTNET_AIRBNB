import { useNotification } from '@/contexts';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { history } from '@/main';
import { LoginPayload, User } from '@/types';
import { authService } from '@/services/api';
import { storage } from '@/utils/storage';
import storageKeys from '@/constants/storageKeys';

type Props = {}

const useLogin = (props: Props) => {
  const { handleNotification } = useNotification();
  const { AUTH } = API_ENDPOINTS;

  // Login cho user
  const handleUserLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'user_dashboard');
  };

  // Login cho host
  const handleHostLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'host_dashboard');
  };

  // Login cho admin
  const handleAdminLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'admin_dashboard');
  };

  // Logic dùng chung cho tất cả các vai trò
  const commonLoginLogic = async (payload: LoginPayload, redirectPath: string) => {
    try {
      // Gọi API để đăng nhập và nhận thông tin phản hồi từ server
      const response: User = await authService.login(payload);

      // Mã hóa và lưu token vào localStorage một cách an toàn
      storage.set(storageKeys.USER_INFO, {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        phoneNumber: response.phoneNumber,
        isHost: response.isHost,
        isAdmin: response.isAdmin,
        isUser: response.isUser,
        avatar: response.avatar,
        accessToken: response.token.accessToken,
        refreshToken: response.token.refreshToken,
        expiresIn: Date.now() + 3600000,
      });

      // Điều hướng dựa trên role
      history.push(redirectPath);
      handleNotification('Đăng nhập thành công!', 'success');
    } catch (error) {
      handleNotification('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
    }
  };

  return {
    handleUserLogin,
    handleHostLogin,
    handleAdminLogin,
  };
};

export default useLogin;
