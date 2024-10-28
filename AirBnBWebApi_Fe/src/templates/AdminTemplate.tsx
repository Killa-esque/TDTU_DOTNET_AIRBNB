// src/templates/AdminTemplate.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import { Footer, Header, SideNav } from "@/components/Admin/Layout";

function AdminTemplate() {
  const [visible, setVisible] = useState(false);
  const openDrawer = () => setVisible(!visible);


  let { pathname } = useLocation();
  return (
    <div className="flex h-screen p-5">
      {/* Sidebar - Mobile Drawer */}
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={250}
        className="block lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <div className="shadow-lg rounded-lg overflow-hidden">
          <SideNav />
        </div>
      </Drawer>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-shrink-0 shadow-lg rounded-lg">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full bg-white shadow-lg rounded-lg ml-5">
        {/* Header */}
        <div className={`w-full sticky top-0 z-50 shadow-md rounded-t-lg`}>
          <Header onPress={openDrawer} name={pathname} subName={pathname} />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export { AdminTemplate };
