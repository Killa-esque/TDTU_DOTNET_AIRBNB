import { useNotification } from "@/contexts/NotificationContext"; // Assuming the context is here
import "@/assets/css/login.css";
import { history } from "@/main";
import LoginForm from "@/components/User/Form/LoginForm";
import bgImage from "@/assets/images/bg-login.jpg";

export default function Login() {
  const { handleNotification } = useNotification();

  const handleSubmitLogin = async (values: { email: string; password: string }, { resetForm }: any) => {
    try {
      // Handle API login logic
      handleNotification("Bạn đã đăng nhập thành công", "success");
      console.log(values);
      // localStorage.setItem("USER_INFO", JSON.stringify({ /* result.data.content */ }));
      // history.push("/");
    } catch (error) {
      handleNotification("Xin vui lòng thử lại", "error");
    }
    resetForm();
  };

  return (
    <div
      className="w-screen h-screen relative bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full p-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-lg shadow-lg bg-white px-10 py-5 w-4/5 sm:w-1/2 md:w-2/5">
          <LoginForm handleSubmitLogin={handleSubmitLogin} />
        </div>
      </div>
    </div>

  );
}
