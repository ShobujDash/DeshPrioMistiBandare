import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/user/Login";
import AdminDashboardPage from "./pages/AdminPages/AdminDashboardPage";
import Home from "./pages/Home";
import AdminProtectedRoutes from "./services/AdminProtectedRoute";
import "./style/adminCss.css";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/AdminPages/CetegoryPage";
import ProductPage from "./pages/AdminPages/ProductPage";
import DiscountSprtUserPage from "./pages/AdminPages/UserProductsAddOrUpdate";
import TodaysCalculationPage from "./pages/AdminPages/TodaysCalculation";
import AdminProfilePage from "./pages/AdminPages/AdminProfilePage";
import ProtectedRoutes from "./services/ProtectedRoutes";
import UserProfilePage from "./pages/UserProfilePage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import MessagePage from "./pages/MessagePage";
import AllorderPage from "./pages/AdminPages/AllorderPage";
import AlluserPage from "./pages/AdminPages/AlluserPage";
import AllTranstionPage from "./pages/AdminPages/AllTranstionPage";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-screen flex flex-col bg-primary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/order" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reels" element={<MessagePage />} />
          <Route path="/message" element={<MessagePage />} />

          {/* Admin Route */}
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/categroy" element={<CategoryPage />} />
            <Route path="/admin/product" element={<ProductPage />} />
            <Route
              path="/admin/product-discount-for-saparate-user"
              element={<DiscountSprtUserPage />}
            />
            <Route
              path="/admin/todays-calculation"
              element={<TodaysCalculationPage />}
            />
            <Route path="/admin/allorder" element={<AllorderPage />} />
            <Route path="/admin/alluser" element={<AlluserPage />} />
            <Route
              path="/admin/alltransaction"
              element={<AllTranstionPage />}
            />

            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>

          {/* User Route */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/order" element={<UserProfilePage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <ToastContainer />
    </AnimatePresence>
  );
}

export default App;
