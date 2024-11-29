
import axios from "axios";

const instance = axios.create({
  baseURL: "https://deshpriomistibandare.onrender.com",
  withCredentials: true, // Cookie পাঠানোর জন্য
});

export default instance;




