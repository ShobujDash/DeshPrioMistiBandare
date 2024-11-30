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

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-screen flex flex-col bg-primary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/details" element={<ProductDetails />} />
          

          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/add-categroy" element={<CategoryPage />} />
            <Route path="/admin/add-product" element={<AdminDashboardPage />} />
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
