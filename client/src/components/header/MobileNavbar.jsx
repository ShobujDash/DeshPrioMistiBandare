import { useEffect, useState } from "react";
import logo from "../../assets/rasgulla.png";

import { CgMenuBoxed, CgProfile } from "react-icons/cg";
import { FaBars, FaXmark } from "react-icons/fa6";
import {
  MdLogin,
  MdLogout,
  MdOutlineInfo,
  MdShoppingBasket,
} from "react-icons/md";

import { motion } from "framer-motion";
import { RiHome3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/avatar.png";
import { useCartContext } from "../../Context/CartContext";
import { useAuthContext } from "../../Context/AuthContex";
import instance from "../../axios";
import { toast } from "react-toastify";

const MobileNavbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();

  const { cart, toggleCartVisibility } = useCartContext();

  const handleCartVisibility = (e) => {
    toggleCartVisibility();
    // dispatch(toggleCart(e));
  };

  const login = () => {
    setIsMenu(!isMenu);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call the logout endpoint
      const { data } = await instance.post("/api/user/logout");
      if (data?.success) {
        toast.success("Logout Successfully");
        navigate("/login");
        setUser(null)
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  

  return (
    <div className=" flex items-center justify-between md:hidden  w-full h-full">
      <div className="relative flex items-center justify-center ">
        <MdShoppingBasket
          onClick={handleCartVisibility}
          className="text-textColor  text-2xl  cursor-pointer"
        />
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-xs text-red-950 font-semibold">{cart.length}</p>
        </div>
      </div>

      <div>
        <Link
          to={"/"}
          className="flex flex-row items-center gap-2 cursor-pointer"
        >
          <img src={logo} className="w-7 object-cover" alt="logo" />
          <p className="text-headingColor text-[25px] font-bold">দেশপ্রিয়</p>
        </Link>
      </div>

      <div className="relative ">
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={login}
          src={profile}
          className="w-10 pt-1 min-w-[35px] h-10 min-h-[35px] drop-shadow-md cursor-pointer"
          alt="userProfile"
        >
          {isMenu ? (
            <FaXmark className="w-6 h-6 text-headingColor" />
          ) : (
            <FaBars className="w-6 h-6 text-headingColor" />
          )}
        </motion.div>

        {user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="w-40 bg-gray-50  shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
          >
            {isMenu && (
              <>
                <Link to={"/profile"}>
                  <p
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    {" "}
                    <CgProfile /> Profile
                  </p>
                </Link>

                <ul className=" items-center w-full ">
                  <Link
                    to={"/"}
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <RiHome3Line /> Home
                  </Link>
                
                  {user && !user.isAdmin ? (
                    <Link
                      to={"/order"}
                      onClick={() => setIsMenu(false)}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                    >
                      <CgMenuBoxed /> My Order
                    </Link>
                  ) : null}
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <MdOutlineInfo /> About Us
                  </li>
                </ul>

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

                <Link to={"/login"}>
                  <p
                    onClick={handleLogout}
                    className="m-2 px-2 py-[6px]  flex items-center  bg-gray-200 hover:bg-gray-300 gap-3 cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base rounded-md shadow-md"
                  >
                    <MdLogout /> Logout{" "}
                  </p>
                </Link>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="w-40 bg-gray-50  shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
          >
            {isMenu && (
              <>
                <ul className=" items-center w-full ">
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <RiHome3Line /> Home
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <CgMenuBoxed /> Menu
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <MdOutlineInfo /> About Us
                  </li>
                </ul>

                <Link to={"/login"}>
                  <p
                    onClick={() => navigate("/login")}
                    className="m-2 px-2 py-[6px]  flex items-center  bg-gray-200 hover:bg-gray-300 gap-3 cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out text-textColor text-base rounded-md shadow-md bg-blue-300"
                  >
                    <MdLogin /> Login{" "}
                  </p>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
