import BottomNavbar from "../footer/BottomNavbar";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <div
        className="pb-20 sm:pb-5"
      >
        {children}
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomNavbar />
    </>
  );
};

export default Layout;
