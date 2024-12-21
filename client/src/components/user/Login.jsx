import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../Context/AuthContex";
import Loading from "../Loading";
import "./login.css";
import instance from "../../axios";
import OAuth from "../OAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [btnLoader, setBtnLoader] = useState(false);

  const [addActiveClass, setAddActiveClass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // login handeler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoader(true);
      const { data } = await instance.post("/api/user/login", formData);

      if (data?.success) {
        toast.success("লগইন সফল।");

        try {
          // প্রোফাইল ডেটা নিয়ে নেভিগেশনের জন্য চেক করুন
          const { data: profileData } = await instance.get(
            "/api/user/getProfile"
          );

          if (profileData?.success) {
              setUser(profileData.data);
            if (profileData?.data?.isAdmin) {
              navigate("/admin"); // অ্যাডমিন পৃষ্ঠায় নেভিগেট করুন
            } else {
              navigate("/"); // হোম পৃষ্ঠায় নেভিগেট করুন
            }
          } else {
            toast.error("প্রোফাইল ডেটা আনতে ব্যর্থ।");
          }
        } catch (profileError) {
          console.error("প্রোফাইল ফেচিং ত্রুটি:", profileError);
          toast.error("প্রোফাইল ফেচিং ত্রুটি। আবার চেষ্টা করুন।");
        }
      } else {
        toast.error(data?.message || "লগইন ব্যর্থ। আবার চেষ্টা করুন।");
      }
    } catch (loginError) {
      console.error("লগইন ত্রুটি:", loginError);
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBtnLoader(false);
    }
  };



  // register handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoader(true);
      const { data } = await instance.post("/api/user/register", formData);

      if (data?.success) {
        toast.success("Register Successfull.");
        navigate("/");
        setBtnLoader(false);
      } else {
        toast.error(data?.message);
        setBtnLoader(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong...");
      setBtnLoader(false);
    }
  };

  return (
    <div className="body">
      <div className={`container ${addActiveClass ? "active" : ""}`}>
        {/* <!-- sign in  --> */}
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit} action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-open-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              {btnLoader ? <Loading /> : "Login"}
            </button>

            <p>or login with social platforms</p>
            {/* <div className="social-icons">
              <a href="#">
                <div className="px-6 sm:px-0 max-w-sm">
                  <button
                    type="button"
                    className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign up with Google<div></div>
                  </button>
                </div>
              </a>
            </div> */}
            <OAuth/>
          </form>
        </div>

        {/* <!-- sing up --> */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit} action="">
            <h1>Registration</h1>
            <div className="input-box">
              <input
                value={formData.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Username"
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-open-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              {btnLoader ? <Loading /> : "Register"}
            </button>
            <p>or register with social platforms</p>
            {/* <div className="social-icons">
              <a href="#">
                <div className="px-6 sm:px-0 max-w-sm">
                  <button
                    type="button"
                    className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign up with Google<div></div>
                  </button>
                </div>
              </a>
            </div> */}
            <OAuth/>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome</h1>
            <p>Don't have an account?</p>
            <button
              onClick={() => setAddActiveClass(true)}
              className="btn register-btn"
            >
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              onClick={() => setAddActiveClass(false)}
              className="btn login-btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
