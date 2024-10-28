// src/pages/Account/PersonalInfo.tsx
import AccountLayout from "@/components/User/Layout/AccountLayout/AccountLayout";
import CustomSidebar from "@/components/User/Layout/AccountLayout/CustomSidebar";
import { FaBell, FaEnvelope, FaEye, FaKey, FaLock, FaMapMarkerAlt, FaPhone, FaQuestionCircle, FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const PersonalInfo = () => {
  // Nội dung phần content
  const content = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Legal Name</h2>
          <p className="text-lg font-medium">Vinh Vo</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Edit</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Email Address</h2>
          <p className="text-lg font-medium">p***@gmail.com</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Edit</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Phone Number</h2>
          <p className="text-lg font-medium">Not provided</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Add</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Address</h2>
          <p className="text-lg font-medium">Not provided</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Add</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Nationality</h2>
          <p className="text-lg font-medium">Vietnamese</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Edit</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Date of Birth</h2>
          <p className="text-lg font-medium">January 1, 1990</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Edit</NavLink>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">Gender</h2>
          <p className="text-lg font-medium">Male</p>
        </div>
        <NavLink to="#" className="text-pinkCustom hover:underline">Edit</NavLink>
      </div>
    </div>
  );

  // Nội dung phần sidebar
  const sidebarItems = [
    {
      icon: <FaUserShield className="text-pinkCustom w-6 h-6" />,
      title: "Why can't I see my information?",
      description: "We're hiding some account details to protect your identity.",
    },
    {
      icon: <FaLock className="text-pinkCustom w-6 h-6" />,
      title: "What information can I edit?",
      description: "You can edit your contact and personal details.",
    },
    {
      icon: <FaEye className="text-pinkCustom w-6 h-6" />,
      title: "What information is shared with others?",
      description: "Only contact details and booking information are shared with hosts after a booking is confirmed.",
    },
    {
      icon: <FaEnvelope className="text-pinkCustom w-6 h-6" />,
      title: "How do I change my email address?",
      description: "You can update your email address in the 'Login & Security' section of your account settings.",
    },
    {
      icon: <FaPhone className="text-pinkCustom w-6 h-6" />,
      title: "How do I update my phone number?",
      description: "You can add or update your phone number in the 'Personal Information' section.",
    },
    {
      icon: <FaKey className="text-pinkCustom w-6 h-6" />,
      title: "How can I reset my password?",
      description: "If you've forgotten your password, you can reset it in the 'Login & Security' section.",
    },
    {
      icon: <FaMapMarkerAlt className="text-pinkCustom w-6 h-6" />,
      title: "How do I update my address?",
      description: "You can add or update your address details in the 'Personal Information' section.",
    },
  ];


  return (
    <AccountLayout
      title="Personal Information"
      content={content}
      sidebar={<CustomSidebar items={sidebarItems} />}
    />
  );
};

export default PersonalInfo;
