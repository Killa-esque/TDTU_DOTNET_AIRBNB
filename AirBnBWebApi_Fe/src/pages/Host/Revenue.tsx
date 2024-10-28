import React from 'react'
import { Button, Card, Typography } from 'antd';
import { SettingOutlined, ExpandOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { chartData, revenueData } from '@/data/host';

type Props = {}

const Revenue = (props: Props) => {
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) => `$${tickValue}`,
        },
      },
    },
  };



  const chartDataConfig = {
    labels: chartData.map(data => data.month),
    datasets: [
      {
        label: 'Income',
        data: chartData.map(data => data.income),
        borderColor: '#000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 md:p-10 lg:p-12">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Thu nhập</h1>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Bạn có thu nhập <span className="text-black">${revenueData.currentMonthIncome.toFixed(2)}</span> trong tháng này
        </p>
      </section>

      {/* Main Content */}
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        {/* Chart and Overview */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <Button icon={<SettingOutlined />} />
            <Button icon={<ExpandOutlined />} />
          </div>
          <Line data={chartDataConfig} options={chartOptions} />
        </div>

        {/* Summary Card */}
        <Card className="w-full md:w-1/3 shadow-md">
          <h2 className="text-lg font-semibold">Tổng hợp từ đầu năm đến nay</h2>
          <p className="text-sm text-gray-500">1 thg 1 - 28 thg 10, 2024</p>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <span>Thu nhập gộp</span>
              <span>${revenueData.totalIncome.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Khoản điều chỉnh</span>
              <span>${revenueData.adjustments.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Phí dịch vụ</span>
              <span>${revenueData.serviceFees.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Thuế đã khấu trừ</span>
              <span>${revenueData.taxes.toFixed(2)}</span>
            </li>
            <hr className="my-2" />
            <li className="flex justify-between font-semibold">
              <span>Tổng (USD)</span>
              <span>${(revenueData.totalIncome - revenueData.adjustments - revenueData.serviceFees - revenueData.taxes).toFixed(2)}</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Upcoming & Completed Bookings */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Sắp tới</h2>
        {revenueData.upcomingBookings.length === 0 ? (
          <p className="text-gray-500">Hiện tại không có lượt đặt phòng sắp tới nào.</p>
        ) : (
          <div>
            {/* Map các mục sắp tới */}
          </div>
        )}
        <h2 className="text-xl font-bold mt-6">Đã hoàn thành</h2>
        {revenueData.completedBookings.length === 0 ? (
          <p className="text-gray-500">
            Các khoản chi trả sẽ được gửi sau khi khách nhận phòng. <a href="#" className="text-blue-600">Tìm hiểu về quy trình chi trả</a>.
          </p>
        ) : (
          <div>
            {/* Map các mục đã hoàn thành */}
          </div>
        )}
      </section>
    </div>
  );
}

export default Revenue
