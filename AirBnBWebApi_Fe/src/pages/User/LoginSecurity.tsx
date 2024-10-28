// src/pages/Account/LoginSecurity.tsx

import AccountLayout from "@/components/User/Layout/AccountLayout/AccountLayout";
import CustomSidebar from "@/components/User/Layout/AccountLayout/CustomSidebar";
import { FaShieldAlt, FaKey, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const LoginSecurity = () => {
  // Nội dung phần content
  const content = (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Login</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Password</p>
            <p className="text-sm text-gray-500">Last updated 6 days ago</p>
          </div>
          <NavLink to="#" className="text-pinkCustom hover:underline">Update</NavLink>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Account</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Facebook</p>
            <p className="text-sm text-gray-500">Connected</p>
          </div>
          <NavLink to="#" className="text-pinkCustom hover:underline">Disconnect</NavLink>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Deactivate your account</p>
          <NavLink to="#" className="text-red-600 hover:underline">Deactivate</NavLink>
        </div>
      </div>
    </div>
  );

  // Các item trong CustomSidebar cho trang Login & Security
  const sidebarItems = [
    {
      icon: <FaShieldAlt className="text-pinkCustom w-6 h-6" />,
      title: "Account Security",
      description: "We regularly review accounts to ensure maximum security.",
    },
    {
      icon: <FaKey className="text-pinkCustom w-6 h-6" />,
      title: "Password Tips",
      description: "Learn how to create a strong password to secure your account.",
    },
    {
      icon: <FaLock className="text-pinkCustom w-6 h-6" />,
      title: "Privacy Settings",
      description: "Adjust your privacy settings to control what information you share.",
    },
  ];

  return (
    <AccountLayout
      title="Login & Security"
      content={content}
      sidebar={<CustomSidebar items={sidebarItems} />}
    />
  );
};

export default LoginSecurity;
