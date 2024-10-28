import { useState, useEffect } from 'react';
import { AiFillStar } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TotalRating from './TotalRating';
import dayjs from 'dayjs';
import { Rate } from 'antd'; // Import từ antd

interface FeedbackRoomProps {
  // feedBack: {
  //   id: string;
  // };
}

interface Feedback {
  id: string;
  avatar: string;
  tenNguoiBinhLuan: string;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

const CommentSchema = Yup.object().shape({
  noiDung: Yup.string().required('Nội dung bình luận không được trống'),
  saoBinhLuan: Yup.number().required('Điểm đánh giá không được trống')
});

export default function FeedbackRoom(props: FeedbackRoomProps) {
  const [feedBackRoom, setFeedBackRoom] = useState<Feedback[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [rating, setRating] = useState(0);

  const initialValues = {
    noiDung: '',
    saoBinhLuan: rating,
    ngayBinhLuan: dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'), // Sử dụng dayjs để thay thế moment
    maPhong: 1,
    maNguoiBinhLuan: "user123", // Hard-code user ID
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const toggleCommentForm = () => {
    setIsCommenting(!isCommenting);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const renderStarRating = (rating: number) => {
    return (
      <Rate disabled value={rating} /> // Sử dụng Rate từ antd để hiển thị đánh giá
    );
  };

  const renderFeedBack = () => {
    const commentsToDisplay = showAllComments ? feedBackRoom : feedBackRoom.slice(0, 4);
    return commentsToDisplay.map((element) => (
      <div key={element.id} className="mb-5 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div>
            <img src={element.avatar} className="w-12 h-12 rounded-full object-cover" alt="Avatar" />
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-lg text-gray-900">{element.tenNguoiBinhLuan}</h4>
            <span className="text-sm text-gray-500">{element.ngayBinhLuan}</span>
          </div>
        </div>
        <div className="text-gray-800 tracking-wider mt-4">
          <p>{element.noiDung}</p>
        </div>
        <div className="flex items-center">
          {renderStarRating(element.saoBinhLuan)}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    // Hard-code some feedback data
    setFeedBackRoom([
      { id: '1', avatar: 'https://i.pravatar.cc/150?img=3', tenNguoiBinhLuan: 'John Doe', ngayBinhLuan: '2024-10-01', noiDung: 'Great place!', saoBinhLuan: 5 },
      { id: '2', avatar: 'https://i.pravatar.cc/150?img=2', tenNguoiBinhLuan: 'Jane Smith', ngayBinhLuan: '2024-10-02', noiDung: 'Very comfortable.', saoBinhLuan: 4 },
    ]);
  }, []);

  return (
    <>
      <div>
        <h2 className="font-semibold text-gray-800 text-xl pb-4 flex items-center">
          <AiFillStar className="text-rose-500" />
          <span className="ml-2">Hiện có {feedBackRoom.length} đánh giá</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <TotalRating />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-4 sm:w-4/5 mt-5">
        {renderFeedBack()}
        <div className="sm:col-span-2">
          {feedBackRoom.length > 4 && (
            <button
              className="border border-solid border-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider uppercase mr-2"
              onClick={toggleShowAllComments}
            >
              {showAllComments ? 'Ẩn bình luận' : 'Hiển thị thêm bình luận'}
            </button>
          )}
          <button
            className="max-md:mt-2 border border-solid border-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider uppercase"
            onClick={toggleCommentForm}
          >
            Bình luận của bạn
          </button>
        </div>
      </div>
      {isCommenting && (
        <div className="mb-4 mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={CommentSchema}
            onSubmit={(values, { resetForm }) => {
              const dataSubmit = { ...values, saoBinhLuan: rating };
              console.log('Submitted data:', dataSubmit); // Replace API call with console log
              resetForm();
              setIsCommenting(false);
              setRating(0);
            }}
          >
            <Form>
              <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900">
                Bình luận
              </label>
              <Field
                as="textarea"
                id="comment"
                name="noiDung"
                className="border border-solid border-gray-300 p-2 rounded-md w-full"
                placeholder="Nhập bình luận của bạn..."
              />
              <ErrorMessage name="noiDung" component="div" className="text-red-500" />
              <label htmlFor="saoBinhLuan" className="block mb-1 text-sm font-medium text-gray-900">
                Đánh giá (1-5 sao)
              </label>
              <Rate value={rating} onChange={handleRatingChange} /> {/* Sử dụng Rate từ antd cho rating */}
              <ErrorMessage name="saoBinhLuan" component="div" className="text-red-500" />
              <button type="submit" className="mt-2 bg-rose-500 text-white rounded-md p-2 hover:bg-pink-600 transition duration-200 ease-in-out">
                Gửi Bình luận
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
}
