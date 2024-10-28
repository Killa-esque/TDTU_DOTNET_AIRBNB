import { createContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/utils';
import storageKeys from '@/constants/storageKeys';
import { AuthContextProps, User } from '@/types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: () => { },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Hardcode dữ liệu user giả lập để thiết kế và phát triển giao diện
  const mockUser: User = {
    id: '123', // ID giả lập
    fullName: 'Vo Phu Vinh',
    email: 'pzinh@gmail.com',
    phoneNumber: '123456789',
    role: 'USER', // Giả sử đây là người dùng có role 'USER'
    avatar: '/path/to/avatar.png', // Đường dẫn avatar giả lập
    createdAt: new Date('2023-01-01'), // Ngày tạo tài khoản giả lập
    updatedAt: new Date(), // Ngày cập nhật tài khoản giả lập
    token: {
      accessToken: 'mockAccessToken123',
      refreshToken: 'mockRefreshToken123',
    },
  };

  // Thay vì lấy từ storage, bạn có thể gán giá trị mặc định này cho user
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(storage.get(storageKeys.USER_INFO));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = () => {
    storage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(storage.get(storageKeys.USER_INFO));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUser(storage.get(storageKeys.USER_INFO));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const signOut = () => {
//     storage.clear();
//     setUser(null);
//     window.location.reload();
//   };

//   return (
//     <AuthContext.Provider value={{ user, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
