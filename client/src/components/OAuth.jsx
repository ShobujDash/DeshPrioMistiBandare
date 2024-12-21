import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import instance from "@/axios";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../firebase";
import { Button } from "./ui/button";
import { useAuthContext } from "@/Context/AuthContex";

function OAuth() {
  const { user, setUser } = useAuthContext();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      // প্রোফাইল ডেটা নিয়ে নেভিগেশনের জন্য চেক করুন
      const { data: profileData } = await instance.get("/api/user/getProfile");

      if (profileData?.success) {
        setUser(profileData.data);
        if (profileData?.data?.isAdmin) {
          navigate("/admin"); // অ্যাডমিন পৃষ্ঠায় নেভিগেট করুন
        } else {
          navigate("/"); // হোম পৃষ্ঠায় নেভিগেট করুন
        }
      } else {
        toast.error("প্রোফাইল ডেটা আনতে ব্যর্থ।");
      }
    } catch (profileError) {
      console.error("প্রোফাইল ফেচিং ত্রুটি:", profileError);
      toast.error("প্রোফাইল ফেচিং ত্রুটি। আবার চেষ্টা করুন।");
    }
  }

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { data } = await instance.post("/api/user/google", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      if (data?.success) {
        toast.success("Login Successfull.");
        await getUserProfile();
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("ত্রুটি। আবার চেষ্টা করুন।");
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      // gradientDuoTone="pinkToOrange"
      variant="outline"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2 text-lg text-blue-800" />
      Continue with google
    </Button>
  );
}

export default OAuth;
