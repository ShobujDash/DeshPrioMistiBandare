import { createContext, useContext } from "react";

const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const Auth = {
    isAuthenticated: false,
  };

  return <ProductContext.Provider value={Auth}>{children}</ProductContext.Provider>;
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

// Export the provider and hook
export { ProductContextProvider, useProductContext };
