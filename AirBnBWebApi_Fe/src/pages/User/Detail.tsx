import { useState, useEffect } from 'react'
import { AiFillStar } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { FiShare2, FiHeart } from "react-icons/fi";
import { MdOutlinePersonPin, MdOutlineKingBed, MdOutlineAcUnit, MdOutlineDirectionsCar, MdOutlineShower, MdOutlineIron, MdOutlineCountertops, MdOutlineTv, MdOutlineWifi, MdOutlineWaves } from "react-icons/md";
import airCover from "@/assets/images/AirCover.png";
import { Room } from '@/types';
import "@/assets/css/room-detail.css";
import FeedbackRoom from '@/components/User/Common/FeedBackRoom';

type Props = {}

const Detail = (props: Props) => {
  const [feedBackRoom, setFeedBackRoom] = useState<any[]>([]);
  const [roomDetail, setRoomDetail] = useState<Room>({
    id: 1,
    tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
    khach: 3,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
    giaTien: 28,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: false,
    wifi: true,
    bep: false,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: 1,
    hinhAnh: [
      "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg",
      "https://airbnbnew.cybersoft.edu.vn/images/phong2.png"
    ]
  });
  const [description, setDescription] = useState<string[]>([
    "Mô tả 1", "Mô tả 2", "Mô tả 3"
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Dữ liệu cứng cho feedBackRoom
    setFeedBackRoom([{ id: 1, content: "Đánh giá 1" }, { id: 2, content: "Đánh giá 2" }]);
  }, []);
  return (
    <div>
      <div className="container mx-auto px-20 room-details">
        <div>
          <p className="mb-2">
            <span className="font-semibold text-xl sm:text-3xl tracking-widest leading-relaxed text-gray-900">
              {roomDetail.tenPhong}
            </span>
          </p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <span className="flex items-center text-sm font-normal tracking-widest">
                <AiFillStar className="text-rose-500 mr-1" /> 4
              </span>
              <span className="underline text-sm font-normal tracking-widest mx-2">
                {feedBackRoom.length} đánh giá
              </span>
              <span className="text-sm font-normal tracking-widest mx-2 flex items-center">
                <FaAward className="text-rose-500 mr-1" /> Chủ nhà siêu cấp .
              </span>
            </div>
            <div className="flex items-center">
              <button className="px-2 py-1 flex items-center font-semibold text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <FiShare2 />
                <span className="ml-2">Chia sẻ</span>
              </button>
              <button className="px-2 py-1 flex items-center font-semibold text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <FiHeart />
                <span className="ml-2">Yêu thích</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-5">
          <div className="rounded-xl overflow-hidden">
            <img
              className="w-full object-contain rounded-l-xl"
              src={roomDetail.hinhAnh[0]}
              alt="room"
            />
          </div>
        </div>

        <div className="w-full flex sm:flex-row flex-col mt-10 border-b pb-5">
          <div className="w-full sm:w-1/2 lg:w-3/5">
            <div className="pb-5 border-b">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                <span>{description[0]},</span> <span>{description[2]}</span>
              </h2>

              <div className="flex items-center">
                <span className="font-semibold text-gray-600 mr-2">Sức chứa:</span>
                {[...Array(roomDetail.khach)].map((_, index) => (
                  <MdOutlinePersonPin key={index} className="text-gray-500" />
                ))}
                <span className="font-semibold text-gray-600 ml-4">Giường:</span>
                {[...Array(roomDetail.giuong)].map((_, index) => (
                  <MdOutlineKingBed key={index} className="text-gray-500" />
                ))}
                <span className="font-semibold text-gray-600 ml-4">Phòng tắm:</span>
                {[...Array(roomDetail.phongTam)].map((_, index) => (
                  <MdOutlineShower key={index} className="text-gray-500" />
                ))}
              </div>
            </div>

            <div className="mt-5 pb-5 border-b">
              <img className="h-7 mb-4" src={airCover} alt="AirCover" />
              <p className="text-base text-gray-800">
                Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy, thông tin nhà/phòng không chính xác và những vấn đề khác như sự cố trong quá trình nhận phòng.
              </p>
              <button className="font-semibold underline text-base text-gray-800">
                Tìm hiểu thêm
              </button>
            </div>

            <div className="mt-5">
              <h2 className="font-semibold text-gray-800 text-xl pb-4">Nơi này có những gì cho bạn</h2>
              <div className="grid grid-cols-2">
                {roomDetail.dieuHoa && (
                  <div className="flex items-center pb-4">
                    <MdOutlineAcUnit className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Điều hòa</span>
                  </div>
                )}
                {roomDetail.banUi && (
                  <div className="flex items-center pb-4">
                    <MdOutlineIron className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Bàn ủi</span>
                  </div>
                )}
                {roomDetail.bep && (
                  <div className="flex items-center pb-4">
                    <MdOutlineCountertops className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Bếp</span>
                  </div>
                )}
                {roomDetail.doXe && (
                  <div className="flex items-center pb-4">
                    <MdOutlineDirectionsCar className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Đỗ xe</span>
                  </div>
                )}
                {roomDetail.hoBoi && (
                  <div className="flex items-center pb-4">
                    <MdOutlineWaves className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Hồ bơi</span>
                  </div>
                )}
                {roomDetail.tivi && (
                  <div className="flex items-center pb-4">
                    <MdOutlineTv className="text-gray-500" />
                    <span className="ml-4 text-gray-800">TV</span>
                  </div>
                )}
                {roomDetail.wifi && (
                  <div className="flex items-center pb-4">
                    <MdOutlineWifi className="text-gray-500" />
                    <span className="ml-4 text-gray-800">Wifi</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/5">
            <div className="sticky top-28 bg-white shadow-xl border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span>$</span>
                  <span className="text-xl font-semibold">{roomDetail.giaTien}</span>
                  <span>/đêm</span>
                </div>
                <div>
                  <span className="text-sm font-normal mr-1">
                    <AiFillStar className="text-rose-500" /> 4.
                  </span>
                  <span className="underline text-sm font-normal">{feedBackRoom.length} đánh giá</span>
                </div>
              </div>
              {/* <BookingRoom /> */}
              Booking
            </div>
          </div>
        </div>

        <div className="mt-10 pb-5 border-b">
          FeedBack
          <FeedbackRoom
            // feedBack={roomDetail}
          />
        </div>
      </div>
    </div>

  )
}

export default Detail
