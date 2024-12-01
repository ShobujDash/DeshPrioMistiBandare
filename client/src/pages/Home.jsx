import axios from "axios";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../Context/AuthContex";
import MainContainer from "../components/home/MainContainer";

const Home = () => {

  const { user } = useAuthContext()



  return (
    <Layout>
      <main className="mt-14 md:mt-20 md:px-16 bg-primary px-8 py-4 w-full">
        <MainContainer />
      </main>
    </Layout>
  );
};

export default Home;
