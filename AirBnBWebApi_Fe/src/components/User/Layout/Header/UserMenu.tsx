import { useCallback, useState } from "react";
import { MenuOutlined } from "@ant-design/icons"; // Thay thế AiOutlineMenu bằng MenuOutlined từ Ant Design
import useLoginModel from "@/hooks/useLoginModal";
import { useRegisterModal, useRentModal } from "@/hooks";
import MenuItem from "./MenuItem";
import Avatar from "@/components/User/Common/Avatar";
import { authService } from "@/services/api";
import { history } from "@/main";

type SafeUser = {
  name?: string;
  image?: string;
  email?: string;
};

type Props = {
  currentUser?: SafeUser | null;
};

function UserMenu({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Các custom hook useLoginModal, useRegisterModal, useRentModal sẽ cần định nghĩa lại nếu bạn sử dụng chúng trong React
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const rentModel = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <MenuOutlined />f
          <div className="hidden md:block">
            {currentUser ? (
              <Avatar src={currentUser?.image!} userName={currentUser?.name} />
            ) : (
              <img
                className="rounded-full"
                height="30"
                width="30"
                alt="Avatar"
                src="/assets/avatar.png"
              />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => history.push("/trips")} label="My trips" />
                <MenuItem
                  onClick={() => history.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => history.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => history.push("/properties")}
                  label="My properties"
                />
                <MenuItem onClick={onRent} label="Airbnb your home" />
                <hr />
                <MenuItem onClick={authService.logout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModel.onOpen} label="Login" />
                <MenuItem onClick={registerModel.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
