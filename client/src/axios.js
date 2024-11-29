// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://deshpriomistibandare.onrender.com",
  withCredentials: true, // Cookie পাঠানোর জন্য
});

export default instance;




