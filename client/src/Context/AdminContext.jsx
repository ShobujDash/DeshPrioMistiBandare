import { createContext, useContext, useState } from "react";
import instance from "../axios";

const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllCategoirsData = async () => {
    try {
      const { data } = await instance.get("/api/common/getAllCategory");
      if (data?.success) {
        setCategories(data?.categories || []);
      } else if (!data?.success) {
        setCategories([])
      }
    } catch (error) {
      console.log(error);
    }
  };

   const getAllProductsData = async () => {
     try {
       const { data } = await instance.get("/api/common/getAllProducts");
       if (data?.success) {
         setProducts(data?.products || []);
       } else if (!data?.success) {
         setProducts([]);
       }
     } catch (error) {
       console.log(error);
     }
   };


  const Admin = {
    categories,
    setCategories,
    getAllCategoirsData,
    getAllProductsData,
    products,
    setProducts,
  };

  return (
    <AdminContext.Provider value={Admin}>{children}</AdminContext.Provider>
  );
};

const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within an AdminContextProvider"
    );
  }
  return context;
};

// Export the provider and hook
export { AdminContextProvider, useAdminContext };
