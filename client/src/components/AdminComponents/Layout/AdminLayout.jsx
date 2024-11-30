import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const AdminLayout = ({ children }) => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };



  return (
    <>
      <Sidebar toggle={toggle} />
      <section id="content">
        <Navbar onHanldeToggle={handleToggle} />
        <main>{children}</main>
      </section>
    </>
  );
};

export default AdminLayout;
