import { createContext, useContext } from "react";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const Auth = {
    isAuthenticated: false,
  };

  return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

// Export the provider and hook
export { AuthContextProvider, useAuthContext };
