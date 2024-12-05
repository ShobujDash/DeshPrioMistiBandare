// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({ toggle }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const navigate = useNavigate();

//   // Handler to set active index
//   const handleActive = (index, path) => {
//     setActiveIndex(index);
//     navigate(path);
//   };

//   const sidebarmenu = [
//     { icon: "bxs-dashboard", text: "Dashboard", path: "/admin" },
//     {
//       icon: "bxs-shopping-bag-alt",
//       text: "Category List",
//       path: "/admin/categroy",
//     },
//     {
//       icon: "bxs-doughnut-chart",
//       text: "Product List",
//       path: "/admin/product",
//     },
//     { icon: "bxs-group", text: "Discount For User", path: "/admin/product-discount-for-saparate-user" },
//     { icon: "bxs-message-dots", text: "Today's Calculation", path: "/admin/todays-calculation" },
//   ];

//   return (
//     <section id="sidebar" className={`${toggle ? "hide" : ""} `}>
//       <a href="#" className="brand">
//         <i className="bx bxs-smile"></i>
//         <span className="text">AdminHub</span>
//       </a>
//       <ul className="side-menu top">
//         {sidebarmenu.map((item, index) => (
//           <li
//             key={index}
//             className={activeIndex === index ? "active" : ""}
//             onClick={() => handleActive(index, item.path)}
//           >
//             <a href="#">
//               <i className={`bx ${item.icon}`}></i>
//               <span className="text">{item.text}</span>
//             </a>
//           </li>
//         ))}
//       </ul>
//       <ul className="side-menu">
//         <li>
//           <a href="#">
//             <i className="bx bxs-cog"></i>
//             <span className="text">Settings</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="logout">
//             <i className="bx bxs-log-out-circle"></i>
//             <span className="text">Logout</span>
//           </a>
//         </li>
//       </ul>
//     </section>
//   );
// };

// export default Sidebar;



// second

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = ({ toggle }) => {
//   const navigate = useNavigate();
//   const location = useLocation(); // বর্তমান অবস্থান নিন

//   const sidebarmenu = [
//     { icon: "bxs-dashboard", text: "Dashboard", path: "/admin" },
//     {
//       icon: "bxs-shopping-bag-alt",
//       text: "Category List",
//       path: "/admin/categroy",
//     },
//     {
//       icon: "bxs-doughnut-chart",
//       text: "Product List",
//       path: "/admin/product",
//     },
//     {
//       icon: "bxs-group",
//       text: "Discount For User",
//       path: "/admin/product-discount-for-saparate-user",
//     },
//     {
//       icon: "bxs-message-dots",
//       text: "Today's Calculation",
//       path: "/admin/todays-calculation",
//     },
//   ];

//   // বর্তমান পাথের উপর ভিত্তি করে অ্যাকটিভ ইনডেক্স নির্ধারণ
//   const getActiveIndex = () => {
//     return sidebarmenu.findIndex((item) => item.path === location.pathname);
//   };

//   // লোকেশনের পরিবর্তনে অ্যাকটিভ ইনডেক্স সেট করুন
//   const [activeIndex, setActiveIndex] = useState(getActiveIndex());

//   useEffect(() => {
//     setActiveIndex(getActiveIndex());
//   }, [location.pathname]);

//   const handleActive = (index, path) => {
//     navigate(path);
//   };

//   return (
//     <section id="sidebar" className={`${toggle ? "hide" : ""} `}>
//       <a href="#" className="brand">
//         <i className="bx bxs-smile"></i>
//         <span className="text">AdminHub</span>
//       </a>
//       <ul className="side-menu top">
//         {sidebarmenu.map((item, index) => (
//           <li
//             key={index}
//             className={activeIndex === index ? "active" : ""}
//             onClick={() => handleActive(index, item.path)}
//           >
//             <a href="#">
//               <i className={`bx ${item.icon}`}></i>
//               <span className="text">{item.text}</span>
//             </a>
//           </li>
//         ))}
//       </ul>
//       <ul className="side-menu">
//         <li>
//           <a href="#">
//             <i className="bx bxs-cog"></i>
//             <span className="text">Settings</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="logout">
//             <i className="bx bxs-log-out-circle"></i>
//             <span className="text">Logout</span>
//           </a>
//         </li>
//       </ul>
//     </section>
//   );
// };

// export default Sidebar;



// third
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const Sidebar = ({ toggle }) => {
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current location

//   const sidebarmenu = [
//     { icon: "bxs-dashboard", text: "Dashboard", path: "/admin" },
//     {
//       icon: "bxs-shopping-bag-alt",
//       text: "Category List",
//       path: "/admin/categroy",
//     },
//     {
//       icon: "bxs-doughnut-chart",
//       text: "Product List",
//       path: "/admin/product",
//     },
//     {
//       icon: "bxs-group",
//       text: "Discount For User",
//       path: "/admin/product-discount-for-saparate-user",
//     },
//     {
//       icon: "bxs-message-dots",
//       text: "Today's Calculation",
//       path: "/admin/todays-calculation",
//     },
//   ];

//   // Determine active index based on the current path
//   const getActiveIndex = () => {
//     return sidebarmenu.findIndex((item) => item.path === location.pathname);
//   };

//   // Update active index when location changes
//   const [activeIndex, setActiveIndex] = useState(getActiveIndex());

//   useEffect(() => {
//     setActiveIndex(getActiveIndex());
//   }, [location.pathname]);

//   return (
//     <section id="sidebar" className={`${toggle ? "hide" : ""} `}>
//       <Link to="/admin" className="brand">
//         <i className="bx bxs-smile"></i>
//         <span className="text">AdminHub</span>
//       </Link>
//       <ul className="side-menu top">
//         {sidebarmenu.map((item, index) => (
//           <li key={index} className={activeIndex === index ? "active" : ""}>
//             <Link to={item.path}>
//               <i className={`bx ${item.icon}`}></i>
//               <span className="text">{item.text}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <ul className="side-menu">
//         <li>
//           <Link to="#">
//             <i className="bx bxs-cog"></i>
//             <span className="text">Settings</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="#" className="logout">
//             <i className="bx bxs-log-out-circle"></i>
//             <span className="text">Logout</span>
//           </Link>
//         </li>
//       </ul>
//     </section>
//   );
// };

// export default Sidebar;



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
