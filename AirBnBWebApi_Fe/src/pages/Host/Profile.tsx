import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import Avatar from '@/components/User/Common/Avatar';

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>('https://i.pravatar.cc/150?img=12');
  const [form] = Form.useForm();

  const handleAvatarUpload = ({ file }: any) => {
    if (file.status === 'done') {
      // Giả sử nhận URL ảnh từ server
      const newUrl = URL.createObjectURL(file.originFileObj);
      setAvatarUrl(newUrl);
      message.success('Avatar updated successfully!');
    }
  };

  const handleFormSubmit = (values: any) => {
    console.log('Profile Updated:', values);
    message.success('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Host Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <Avatar src={avatarUrl} userName="Host Name" />
          <Upload
            showUploadList={false}
            customRequest={handleAvatarUpload}
            className="mt-4"
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </div>

        {/* Profile Form Section */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          className="w-full lg:w-2/3"
        >
          <Form.Item
            label="Full Name"
            name="name"
            initialValue="Host Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue="host@example.com"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            initialValue="+123456789"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="About Me"
            name="about"
            initialValue="I am a host who loves meeting new people and providing a great experience."
          >
            <Input.TextArea rows={4} placeholder="Tell us a bit about yourself" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
