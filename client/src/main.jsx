import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { AuthContextProvider } from "./Context/AuthContex.jsx";
import "./index.css";
import { AdminContextProvider } from "./Context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
