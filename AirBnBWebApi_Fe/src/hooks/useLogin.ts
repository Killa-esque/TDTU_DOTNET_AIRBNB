import { useNotification } from '@/contexts';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { LoginPayload, User } from '@/types';
import { authService } from '@/services/api';
import { storage } from '@/utils/storage';
import storageKeys from '@/constants/storageKeys';
import { useNavigate } from 'react-router-dom';

type Props = {}

const useLogin = (props: Props) => {
  const { handleNotification } = useNotification();
  const navigate = useNavigate();

  const { AUTH } = API_ENDPOINTS;

  // Login cho user
  const handleUserLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'user_dashboard');
  };

  const handleHostLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'host_dashboard');
  };

  const handleAdminLogin = async (payload: LoginPayload) => {
    await commonLoginLogic(payload, 'admin_dashboard');
  };

  const commonLoginLogic = async (payload: LoginPayload, redirectPath: string) => {
    try {
      const response: User = await authService.login(payload);

      storage.set(storageKeys.USER_INFO, {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        phoneNumber: response.phoneNumber,
        role: response.role,
        avatar: response.avatar,
        token: {
          accessToken: response.token.accessToken,
          refreshToken: response.token.refreshToken,
        },
        expiresIn: Date.now() + 3600000,
      });

      navigate(redirectPath);
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
