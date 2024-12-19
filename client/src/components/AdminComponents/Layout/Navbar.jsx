import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import profile from "../../../assets/people.png";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../Context/AuthContex";
import instance from "../../../axios";

const Navbar = ({ onHanldeToggle }) => {
  const { user } = useAuthContext();

  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call the logout endpoint
      const { data } = await instance.post("/api/user/logout");
      if (data?.success) {
        toast.success("Logout Successfully");
        navigate("/login");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <nav className="h-14 w-full bg-light px-6 flex items-center gap-6 sticky top-0 left-0 z-50 font-lato">
        <i
          onClick={() => onHanldeToggle()}
          className="bx bx-menu cursor-pointer text-dark"
        ></i>
        <a
          href="#"
          className="text-dark text-xl font-bold transition-colors duration-300 hover:text-blue"
        >
          দেশপ্রিয়
        </a>
        <form action="#" className="hidden sm:block w-full max-w-lg mr-auto">
          <div className="flex items-center h-9">
            <input
              type="search"
              placeholder="Search..."
              className="flex-grow px-4 h-full bg-grey rounded-l-full outline-none text-dark w-full"
            />
            <button
              type="submit"
              className="w-9 bg-blue-600 text-white h-full flex justify-center items-center bg-blue text-light text-lg rounded-r-full outline-none"
            >
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>
        <input type="checkbox" id="switch-mode" hidden />
        <label
          htmlFor="switch-mode"
          className="w-12 h-6 rounded-full bg-grey relative cursor-pointer"
        >
          <span className="absolute top-[2px] left-[2px] w-5 h-5 bg-blue rounded-full transition-all duration-300"></span>
        </label>
        <a href="#" className="relative text-xl text-dark">
          <i className="bx bxs-bell"></i>
          <span className="absolute top-[-6px] right-[-6px] w-5 h-5 rounded-full border-2 border-light bg-red text-light text-xs font-bold flex justify-center items-center">
            8
          </span>
        </a>

        {/* Profile */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsMenu(!isMenu)}
            src={profile}
            className="w-10 min-w-[35px] h-10 -mt-1 min-h-[35px] rounded-full drop-shadow-md cursor-pointer"
            alt="userProfile"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="w-40 bg-gray-50  shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
          >
            {isMenu && (
              <>
                <Link to={"/admin/profile"} key="profile">
                  <p
                    onClick={() => setIsMenu(false)}
                    className="flex gap-2 px-2 py-3"
                  >
                    <CgProfile /> Profile
                  </p>
                </Link>
                {user && user.isAdmin ? (
                  <Link to={"/admin"} key="dashboard">
                    <p
                      onClick={() => setIsMenu(false)}
                      className="flex gap-2 px-2 py-3"
                    >
                      <RxDashboard /> Dashboard
                    </p>
                  </Link>
                ) : null}

                <Link to={"/login"} key="logout">
                  <p onClick={handleLogout} className="flex gap-2 px-2 py-3">
                    <MdLogout /> Logout
                  </p>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
