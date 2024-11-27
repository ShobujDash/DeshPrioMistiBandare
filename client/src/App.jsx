import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import SignUp from "./components/user/SignUp";
import AdminDashboardPage from "./pages/AdminPages/AdminDashboardPage";
import Home from "./pages/Home";
import AdminProtectedRoutes from "./services/AdminProtectedRoute";
import "./style/adminCss.css";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-screen flex flex-col bg-primary">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <ToastContainer />
    </AnimatePresence>
  );
}

export default App;
