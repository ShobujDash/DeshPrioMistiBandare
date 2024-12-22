
import axios from "axios";

const instance = axios.create({
  baseURL: "https://deshpriomistibandare.onrender.com",
  // baseURL: import.meta.VITE_PRODUCTION_URL,
  withCredentials: true, // Cookie পাঠানোর জন্য
});

export default instance;


// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.VITE_LOCATHOST_URL,
//   withCredentials: true, // Cookie পাঠানোর জন্য
// });

// export default instance;




