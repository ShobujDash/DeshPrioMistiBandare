import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Handler to set active index
  const handleActive = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  const sidebarmenu = [
    { icon: "bxs-dashboard", text: "Dashboard", path: "/admin" },
    {
      icon: "bxs-shopping-bag-alt",
      text: "Category List",
      path: "/admin/categroy",
    },
    {
      icon: "bxs-doughnut-chart",
      text: "Product List",
      path: "/admin/product",
    },
    { icon: "bxs-group", text: "Discount For User", path: "/admin/product-discount-for-saparate-user" },
    { icon: "bxs-message-dots", text: "Today's Calculation", path: "/admin/todays-calculation" },
  ];

  return (
    <section id="sidebar" className={`${toggle ? "hide" : ""} `}>
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">AdminHub</span>
      </a>
      <ul className="side-menu top">
        {sidebarmenu.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => handleActive(index, item.path)}
          >
            <a href="#">
              <i className={`bx ${item.icon}`}></i>
              <span className="text">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
