import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate()

  // Handler to set active index
  const handleActive = (index) => {
    setActiveIndex(index);
    navigate('/')
  };

  const sidebarmenu = [
    { icon: "bxs-dashboard", text: "Dashboard" },
    { icon: "bxs-shopping-bag-alt", text: "My Store" },
    { icon: "bxs-doughnut-chart", text: "Analytics" },
    { icon: "bxs-message-dots", text: "Message" },
    { icon: "bxs-group", text: "Team" },
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
            onClick={() => handleActive(index)}
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
