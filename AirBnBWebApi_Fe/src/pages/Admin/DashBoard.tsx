// src/pages/AdminDashboard.tsx
import React from 'react';

const DashBoard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Card Tổng số người dùng */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-pink-500 mt-2">1,234</p>
          <p className="text-gray-500 mt-1">Compared to last month: +5%</p>
        </div>

        {/* Card Tổng số đơn đặt phòng */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">Bookings</h2>
          <p className="text-3xl font-bold text-pink-500 mt-2">567</p>
          <p className="text-gray-500 mt-1">Compared to last month: +10%</p>
        </div>

        {/* Card Tổng doanh thu */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-3xl font-bold text-pink-500 mt-2">$12,345</p>
          <p className="text-gray-500 mt-1">Compared to last month: +15%</p>
        </div>

        {/* Card Hỗ trợ khách hàng */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">Support Tickets</h2>
          <p className="text-3xl font-bold text-pink-500 mt-2">23</p>
          <p className="text-gray-500 mt-1">Compared to last month: -3%</p>
        </div>
      </div>

      {/* Biểu đồ hoặc bảng */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Revenue Overview</h2>
        <div className="h-64 flex justify-center items-center">
          <p className="text-gray-500">[Placeholder for a revenue chart]</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Bookings</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">#1234</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">2024-10-25</td>
              <td className="px-4 py-2 text-green-500">Completed</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">#1235</td>
              <td className="px-4 py-2">Jane Smith</td>
              <td className="px-4 py-2">2024-10-24</td>
              <td className="px-4 py-2 text-yellow-500">Pending</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">#1236</td>
              <td className="px-4 py-2">Michael Johnson</td>
              <td className="px-4 py-2">2024-10-23</td>
              <td className="px-4 py-2 text-red-500">Cancelled</td>
            </tr>
            {/* Thêm các dòng dữ liệu khác nếu cần */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
