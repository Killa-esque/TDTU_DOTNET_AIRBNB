// src/contexts/ModalContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalAuthContextProps {
  isAuthModalOpen: boolean;
  isLogin: boolean;
  openAuthModal: (loginMode?: boolean) => void;
  closeAuthModal: () => void;
}

const ModalAuthContext = createContext<ModalAuthContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openAuthModal = (loginMode = true) => {
    setIsLogin(loginMode);
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <ModalAuthContext.Provider value={{ isAuthModalOpen, isLogin, openAuthModal, closeAuthModal }}>
      {children}
    </ModalAuthContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalAuthContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
