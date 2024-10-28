import React, { useState } from 'react';
import { Button } from 'antd';
import { mockData } from '@/data/host';

const tabs = [
  { label: 'Sắp trả phòng', key: 'checkout' },
  { label: 'Hiện đang đón tiếp', key: 'current' },
  { label: 'Sắp tới', key: 'upcoming' },
  { label: 'Đánh giá đang chờ xử lý', key: 'pendingReviews' },
];

const HostHomePage = () => {
  const [activeTab, setActiveTab] = useState('current'); // Tab mặc định

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const renderTabContent = () => {
    const data = mockData[activeTab as keyof typeof mockData];
    if (!data || data.length === 0) {
      return <div className="text-gray-500 mt-4">Không có dữ liệu.</div>;
    }

    return (
      <div className="space-y-4 mt-4">
        {data.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-semibold">{booking.guestName}</h4>
              <p>Phòng: {booking.roomName}</p>
              <p>
                Ngày check-in: {booking.checkIn} - Ngày check-out: {booking.checkOut}
              </p>
            </div>
            <Button type="link" className="text-red-500">
              Xem chi tiết
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-10 lg:p-12">
      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Hân hạnh chào đón Phú!
        </h1>
      </section>

      {/* Booking Tabs */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Đặt phòng/đặt chỗ của bạn
        </h2>
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-sm border ${activeTab === tab.key ? 'border-black text-black' : 'border-gray-300 text-gray-500'
                } rounded-full transition hover:border-black`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label} ({mockData[tab.key as keyof typeof mockData].length})
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="bg-gray-100 p-4 rounded-lg">
        {renderTabContent()}
      </section>

      {/* Actions Section */}
      <section className="flex flex-wrap justify-between items-center mt-8">
        <Button
          type="default"
          className="border-black text-black font-semibold hover:bg-gray-200"
        >
          Hoàn tất mục cho thuê của bạn
        </Button>
        <button
          className="text-black underline hover:text-pink-500 transition text-sm mt-4 md:mt-0"
        >
          Tất cả đặt phòng (0)
        </button>
      </section>
    </div>
  );
};

export default HostHomePage;
