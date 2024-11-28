import axios from "axios";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../Context/AuthContex";

const Home = () => {

  const {user} = useAuthContext()


  return (
    <Layout>
      {/* <button className=" p-2 bg-red-300" onClick={getprofiledata}>
        profile data
      </button> */}
    </Layout>
  );
};

export default Home;
