
// fourth this is more easy and short 
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = ({ toggle }) => {
  const location = useLocation();

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
    {
      icon: "bxs-group",
      text: "Discount For User",
      path: "/admin/product-discount-for-saparate-user",
    },
    {
      icon: "bxs-message-dots",
      text: "Today's Calculation",
      path: "/admin/todays-calculation",
    },
  ];

  return (
    <section id="sidebar" className={`${toggle ? "hide" : ""}`}>
      <Link to="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">AdminHub</span>
      </Link>
      <ul className="side-menu top">
        {sidebarmenu.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <i className={`bx ${item.icon}`}></i>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="#">
            <i className="bx bxs-cog"></i>
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span>HomePage</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
