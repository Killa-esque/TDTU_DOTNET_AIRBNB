import { JwtPayload } from "@/types";
import axios from "axios";
import { decodeToken, isTokenExpired } from "@/utils/jwt";
import { CONFIG } from "@/config/appConfig";
import { history } from "@/main";
import { notify } from "@/services/notifications/notificationService"; // Import notify

const axiosClient = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
  timeout: CONFIG.API.TIMEOUT,
});

// Request interceptor
axiosClient.interceptors.request.use(
  async (config: any) => {
    const user = localStorage.getItem('user');

    if (user) {
      const { accessToken } = JSON.parse(user);

      const decodedToken: JwtPayload | null = decodeToken(accessToken);

      if (isTokenExpired(accessToken)) {
        notify('Token has expired. Please login again.', 'error'); // Sử dụng notify
        history.push('/login');
        return Promise.reject(new Error('Token has expired'));
      }

      // Thêm accessToken vào header
      config.headers.Authorization = `Bearer ${accessToken}`;

      // Role-based handling
      if (decodedToken?.Role === 'Admin') {
        console.log('Người dùng là Admin');
      } else if (decodedToken?.Role === 'Host') {
        console.log('Người dùng là Host');
      } else {
        console.log('Người dùng là User');
      }
    }

    return config;
  },
  (error) => {
    notify('Request error. Please try again later.', 'error'); // Sử dụng notify
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý khi response thành công
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      notify('You are not authorized. Please login.', 'error'); // Sử dụng notify
      history.push('/login');
    } else if (status === 403) {
      notify('Access denied. You do not have permission to access this resource.', 'warning'); // Sử dụng notify
      history.push('/forbidden');
    } else if (status === 500) {
      notify('Server error. Please try again later.', 'error'); // Sử dụng notify
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
