import { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { MdLogout, MdShoppingBasket } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/avatar.png";
import { useCartContext } from "../../Context/CartContext";

const DextopNavbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const { cart, toggleCartVisibility } = useCartContext();

  const handleCartVisibility = (e) => {
    toggleCartVisibility();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedin");
    navigate("/login");
  };

  const login = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div className="flex items-center gap-8">
      <ul className="flex items-center gap-8 ">
        <li className="text-base text-textColor font-medium hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          {" "}
          Home
        </li>
        <li className="text-base text-textColor font-medium hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          {" "}
          Menu
        </li>
        <li className="text-base text-textColor font-medium hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          {" "}
          About Us
        </li>
      </ul>

      <div
        onClick={handleCartVisibility}
        className="relative flex items-center justify-center "
      >
        <MdShoppingBasket className="text-textColor  text-2xl  cursor-pointer" />
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-xs text-red-700 font-semibold">{cart.length}</p>
        </div>
      </div>

      {user ? (
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.8 }}
            onClick={login}
            src={profile}
            className="w-10 min-w-[35px] h-10 -mt-1 min-h-[35px] drop-shadow-md cursor-pointer"
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
                <Link to={"/profile"} key="profile">
                  <p onClick={() => setIsMenu(false)} className="...">
                    <CgProfile /> Profile
                  </p>
                </Link>
                <Link to={"/dashboard"} key="dashboard">
                  <p onClick={() => setIsMenu(false)} className="...">
                    <RxDashboard /> Dashboard
                  </p>
                </Link>
                <Link to={"/login"} key="logout">
                  <p onClick={handleLogout} className="...">
                    <MdLogout /> Logout
                  </p>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-sky-600 hover:bg-sky-300 hover:text-sky-100 transition-all duration-500 px-2 py-1 rounded-md font-medium text-white"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default DextopNavbar;
