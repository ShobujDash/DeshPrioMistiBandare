import React, { useState } from 'react';
import ellipse from '../../assets/ellipses.png';
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import './login.css'

const defaultEmail = "dukaan@gmail.com";
const defaultPassword = "password";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: defaultEmail,
    password: defaultPassword
  });

   const [addActiveClass, setAddActiveClass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // navigate("/");
  
  };

  return (
    
    <div className="body">
      <div className={`container ${addActiveClass ? "active" : ""}`}>
        {/* <!-- sign in  --> */}
        <div className="form-box login">
          <form onSubmit={handleSubmit} action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Username"
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="text"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-open-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p>or login with social platforms</p>
            <div className="social-icons">
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
            </div>
          </form>
        </div>

        {/* <!-- sing up --> */}
        <div className="form-box register">
          <form onSubmit={handleSubmit} action="">
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
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
                value={formData.email}
                onChange={handleChange}
                name="password"
                type="text"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-open-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Ragistraion
            </button>
            <p>or register with social platforms</p>
            <div className="social-icons">
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
            </div>
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
}

export default Login;
