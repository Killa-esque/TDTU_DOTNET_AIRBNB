import React from 'react'
import { Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { mockListings } from '@/data/host';

type Props = {}

const Listings = (props: Props) => {
  return (
    <div className="p-6 md:p-10 lg:p-12">
      {/* Header */}
      <section className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Listings</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-black text-white"
        >
          Add New Listing
        </Button>
      </section>

      {/* Listings */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{listing.name}</h2>
              <div className="text-sm text-gray-500">
                {listing.guests} guests • {listing.bedrooms} bedrooms • {listing.bathrooms} bathrooms
              </div>
              <div className="text-lg font-bold mt-2">${listing.pricePerNight} / night</div>
              <Tag color={listing.status === 'active' ? 'green' : 'volcano'} className="mt-2">
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </Tag>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <Button icon={<EditOutlined />} className="text-blue-500 hover:text-blue-700">
                  Edit
                </Button>
                <Button icon={<DeleteOutlined />} className="text-red-500 hover:text-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section className="mt-8 flex justify-center">
        <Button className="mx-1" type="default">1</Button>
        <Button className="mx-1" type="default">2</Button>
        <Button className="mx-1" type="default">3</Button>
        {/* Thêm các nút phân trang khác nếu cần */}
      </section>
    </div>
  )
}

export default Listings
