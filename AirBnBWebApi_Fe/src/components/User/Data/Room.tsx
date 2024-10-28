import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { AiFillStar, AiOutlineWifi, AiOutlineCar } from 'react-icons/ai';
import { FaTv, FaBed, FaUser, FaShower, FaUtensils, FaFan } from 'react-icons/fa'; // Các icon từ FontAwesome
import { GiIronCross } from 'react-icons/gi'; // Iron từ Game Icons
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/assets/css/room.css';
import roomsData from '@/data/rooms.json'; // Import your rooms.json file
import type { Room } from '@/types';

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 16;

  useEffect(() => {
    // Sử dụng dữ liệu JSON đã nhập
    setRooms(roomsData);
  }, []);

  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const currentRooms = useMemo(() => {
    const start = (currentPage - 1) * roomsPerPage;
    const end = start + roomsPerPage;
    return rooms.slice(start, end);
  }, [rooms, currentPage, roomsPerPage]);

  const handleBooking = (roomId: number) => {
    console.log(roomId)
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderRoom = () => {
    return currentRooms.map((element: Room) => {
      const hasMultipleImages = element.hinhAnh.length > 1;
      return (
        <div key={element.id} className='roomLink' onClick={() => handleBooking(element.id)}>
          <Swiper
            slidesPerView={1}
            cssMode={true}
            navigation={hasMultipleImages}
            pagination={hasMultipleImages}
            mousewheel={hasMultipleImages}
            keyboard={hasMultipleImages}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="roomSwiper"
          >
            {element.hinhAnh.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Slide ${index + 1}`} className='w-full' loading="lazy" />
              </SwiperSlide>
            ))}

            <button className='absolute top-3 right-3 z-30'>
              <AiFillStar className="icon-heart" />
            </button>
          </Swiper>

          <div>
            <p className="flex justify-between mt-2">
              <span className="font-bold truncate">{element.tenPhong}</span>
              <span className="flex items-center ml-1">
                <span className="ml-2 text-yellow-500 mx-1">
                  <AiFillStar />
                </span>
                9.14
              </span>
            </p>
            <p className="text-sm mt-2">
              <span className="flex items-center">
                <span className="font-semibold text-gray-600 mr-1">Sức chứa:</span>
                <span className="flex">
                  {[...Array(element.khach)].map((_, index) => (
                    <FaUser key={index} className="inline text-gray-500" />
                  ))}
                </span>
              </span>
              <span className="flex items-center mt-2">
                <span className="font-semibold text-gray-600 mr-1">Giường:</span>
                <span className="flex">
                  {[...Array(element.giuong)].map((_, index) => (
                    <FaBed key={index} className="inline text-gray-500" />
                  ))}
                </span>
              </span>
              <span className="flex items-center mt-2">
                <span className="font-semibold text-gray-600 mr-1">Phòng tắm:</span>
                <span className="flex">
                  {[...Array(element.phongTam)].map((_, index) => (
                    <FaShower key={index} className="inline text-gray-500" />
                  ))}
                </span>
              </span>
              <span className="flex items-center font-semibold text-gray-600 mt-2">
                Các tiện ích:
                {element.dieuHoa && <FaFan className="inline text-gray-500 ml-2" />}
                {element.banUi && <GiIronCross className="inline text-gray-500 ml-2" />}
                {element.bep && <FaUtensils className="inline text-gray-500 ml-2" />}
                {element.doXe && <AiOutlineCar className="inline text-gray-500 ml-2" />}
                {element.tivi && <FaTv className="inline text-gray-500 ml-2" />}
                {element.wifi && <AiOutlineWifi className="inline text-gray-500 ml-2" />}
              </span>
            </p>
            <p className="mt-1 text-xl text-gray-700">
              <span className="font-bold text-2xl text-gray-900">${element.giaTien}</span>
              <span className="text-base text-gray-500">/đêm</span>
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10'>
        {renderRoom()}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button mx-2"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button mx-2 ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Room;
