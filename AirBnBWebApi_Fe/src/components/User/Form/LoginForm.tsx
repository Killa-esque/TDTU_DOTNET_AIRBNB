// src/components/Auth/LoginForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string().min(6, 'Mật khẩu quá ngắn').required('Bắt buộc'),
});

const LoginForm: React.FC = () => {
  return (
    <div className="w-full">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log('Login values', values);
        }}
      >
        <Form className="mt-4 space-y-4">
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pinkCustom"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pinkCustom"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-pinkCustom rounded-md hover:bg-pink-600"
          >
            Đăng nhập
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
