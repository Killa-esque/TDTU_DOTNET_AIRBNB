// src/components/Host/Layout/Header/UserMenu.tsx
import { useState, useCallback } from 'react';
import { Menu, Dropdown, Badge } from 'antd';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import Avatar from '@/components/User/Common/Avatar';
import { useNavigate } from 'react-router-dom';

type SafeUser = {
  name?: string;
  image?: string;
  email?: string;
};

type Props = {
  currentUser?: SafeUser | null;
};

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((value) => !value);
  }, []);

  const onProfile = () => {
    navigate('/host/profile');
    setIsDropdownOpen(false); // Đóng dropdown sau khi chuyển hướng
  };

  const onLogout = () => {
    console.log('Logging out...');
    setIsDropdownOpen(false);
  };

  const onSwitchToUserMode = () => {
    navigate('/user/dashboard');
    setIsDropdownOpen(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={onProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key="switch" onClick={onSwitchToUserMode}>
        Switch to Travel Mode
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center gap-4">
      {/* Notification Icon with Badge */}
      <Badge count={5} offset={[-2, 5]}>
        <BellOutlined className="text-white text-lg cursor-pointer" />
      </Badge>

      {/* User Avatar and Dropdown */}
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
        arrow
        open={isDropdownOpen}
        onOpenChange={toggleDropdown}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          {currentUser ? (
            <Avatar src={currentUser.image} userName={currentUser.name} />
          ) : (
            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              src="https://i.pravatar.cc/150?img=3"
            />
          )}
          <DownOutlined className="text-white" />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
