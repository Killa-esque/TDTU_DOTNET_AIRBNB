import AccountLayout from '@/components/User/Layout/AccountLayout/AccountLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Card } from 'antd';
import { FaHistory, FaCalendarAlt, FaStar, FaMoneyCheckAlt } from 'react-icons/fa';
import 'antd/dist/reset.css';
import CustomSidebar from '@/components/User/Layout/AccountLayout/CustomSidebar';
import { NavLink } from 'react-router-dom';

// Import data (thay thế bằng cách import từ file hoặc API)
const bookingData = [
  {
    "id": 1,
    "tenPhong": "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
    "giaTien": 28,
    "khach": 3,
    "hinhAnh": ["https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg"]
  },
  {
    "id": 2,
    "tenPhong": "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
    "giaTien": 21,
    "khach": 2,
    "hinhAnh": ["https://airbnbnew.cybersoft.edu.vn/images/phong2.png"]
  },
  {
    "id": 3,
    "tenPhong": "Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco",
    "giaTien": 17,
    "khach": 2,
    "hinhAnh": ["https://airbnbnew.cybersoft.edu.vn/images/phong3.png"]
  }
];

const BookingHistory = () => {
  // Nội dung phần content (Booking History)
  const content = (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Booking History</h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="booking-history-swiper"
      >
        {bookingData.map((booking) => (
          <SwiperSlide key={booking.id}>
            <Card
              hoverable
              className="shadow-md rounded-lg transition-transform duration-300 transform hover:scale-105"
              cover={
                <img
                  alt={booking.tenPhong}
                  src={booking.hinhAnh[0]}
                  className="rounded-t-lg object-cover w-full h-48"
                />
              }
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.tenPhong.length > 40
                  ? `${booking.tenPhong.substring(0, 40)}...`
                  : booking.tenPhong}
              </h3>
              <p className="text-sm text-gray-600">Guests: {booking.khach}</p>
              <p className="text-sm text-gray-600">Price: ${booking.giaTien} per night</p>
              <div className="mt-4 flex justify-between">
                <NavLink to="#" className="text-pinkCustom hover:underline">View Details</NavLink>
                <NavLink to="#" className="text-red-600 hover:underline">Cancel Booking</NavLink>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  // Các item trong CustomSidebar cho trang Booking History
  const sidebarItems = [
    {
      icon: <FaHistory className="text-pinkCustom w-6 h-6" />,
      title: "Booking History",
      description: "View and manage your past bookings.",
    },
    {
      icon: <FaCalendarAlt className="text-pinkCustom w-6 h-6" />,
      title: "Upcoming Bookings",
      description: "Check out your future bookings and plan your trips.",
    },
    {
      icon: <FaStar className="text-pinkCustom w-6 h-6" />,
      title: "Reviewed Places",
      description: "See places you’ve reviewed and give ratings to your stays.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-pinkCustom w-6 h-6" />,
      title: "Payment History",
      description: "Keep track of your payments and refunds.",
    },
  ];

  return (
    <AccountLayout
      title="Booking History"
      content={content}
      sidebar={<CustomSidebar items={sidebarItems} />}
    />
  );
};

export default BookingHistory;
