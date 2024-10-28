import React from 'react';
import { Table, Tag, Button } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analysis = () => {
  const data = [
    {
      key: '1',
      userName: 'John Doe',
      review: 'Great experience, highly recommend!',
      rating: 5,
      date: '2024-10-20',
    },
    {
      key: '2',
      userName: 'Jane Smith',
      review: 'Clean and cozy place.',
      rating: 4,
      date: '2024-10-15',
    },
    {
      key: '3',
      userName: 'Michael Johnson',
      review: 'The host was very accommodating.',
      rating: 5,
      date: '2024-10-10',
    },
    {
      key: '4',
      userName: 'Anna Williams',
      review: 'Not as expected, could be better.',
      rating: 3,
      date: '2024-10-05',
    },
  ];

  const columns = [
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Tag color={rating >= 4 ? 'green' : rating === 3 ? 'orange' : 'red'}>{rating} Stars</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: { key: string }) => (
        <Button type="link" danger onClick={() => console.log('Delete review', record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Average Rating',
        data: [4.5, 4.2, 4.8, 4.0, 4.7, 4.6, 4.3],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold">User Analysis</h2>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Average User Ratings Over Time</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Reviews</h3>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default Analysis;
