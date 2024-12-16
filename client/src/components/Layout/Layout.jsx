import BottomNavbar from "../footer/BottomNavbar";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {children}
      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomNavbar/>
    </>
  );
};

export default Layout;
