import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "@/components/User/Logo/Logo";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("(*) Invalid email").required("(*) Email is required"),
  password: Yup.string().required("(*) Password is required"),
});

// Define initial values
const initialValues = {
  email: "",
  password: "",
};

// Define types for props
interface LoginFormProps {
  handleSubmitLogin: (values: typeof initialValues, actions: any) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmitLogin }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="relative mb-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <div className="hidden lg:block font-semibold text-3xl text-blue-800 text-center">
              Login
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              <MailOutlined className="mr-2" /> Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
              required
            />
            <ErrorMessage name="email" component="div" className="text-red-600 font-semibold" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              <LockOutlined className="mr-2" /> Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
              required
            />
            <ErrorMessage name="password" component="div" className="text-red-600 font-semibold" />
          </div>
          <div className="grid grid-cols-2 items-center mb-6">
            <NavLink to="/login" className="text-rose-700 hover:text-rose-500 hover:underline">
              Forget Passowrd?
            </NavLink>
            <button
              type="submit"
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full bg-red-500 hover:bg-red-800"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p>
              You don't have account?{" "}
              <NavLink to="/register" className="text-rose-700 hover:text-rose-500 hover:underline">
                Register
              </NavLink>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
