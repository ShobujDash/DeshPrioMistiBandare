import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaBorderAll } from "react-icons/fa";
import { PiVideo } from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
   const Menus = [
    { name: "Home", icon: <IoHomeOutline />, route: "/", dis: "translate-x-0" },
    {
      name: "Order",
      icon: <FaBorderAll />,
      route: "/order",
      dis: "translate-x-16",
    },
    {
      name: "Cart",
      icon: <IoCartOutline />,
      route: "/cart",
      dis: "translate-x-32",
    },
    {
      name: "Reels",
      icon: <PiVideo />,
      route: "/reels",
      dis: "translate-x-48",
    },
    {
      name: "Message",
      icon: <FaRegMessage />,
      route: "/message",
      dis: "translate-x-64",
    },
  ];

  const [active, setActive] = useState(0);

  // h-screen flex justify-center items-center

  return (
    <div className="sm:hidden fixed bottom-0 bg-gray-900">
      <div className="dark:bg-dark_dark bg-white text-black max-h-[5rem] px-6 rounded-t-xl ">
        <ul className="flex relative">
          <span
            className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute
         -top-5 rounded-full `}
          >
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px]
          rounded-tr-[11px] shadow-myShadow1"
            ></span>
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px]
          rounded-tl-[11px] shadow-myShadow2"
            ></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              <Link
                to={menu.route}
                className="flex flex-col text-center pt-6"
                onClick={() => setActive(i)}
              >
                <span
                  className={`text-black dark:text-white text-2xl cursor-pointer duration-500 ${
                    i === active && "-mt-6 text-white z-10"
                  }`}
                >
                  <div className="ml-5">{menu.icon}</div>
                </span>

                <span
                  className={`text-black dark:text-white ${
                    active === i
                      ? "translate-y-4 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  } `}
                >
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  
  
  
};

export default BottomNavbar;




