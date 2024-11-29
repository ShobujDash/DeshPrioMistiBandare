
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axios";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await instance.get("/api/user/getProfile");

        if (data?.success) {
          setUser(data.data)
        }
      } catch (error) {
        console.log(error)
      }
    
    }
    fetchUserData();
  },[])




  const Auth = {
    user,
    setUser
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
