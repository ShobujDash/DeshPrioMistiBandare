import React from 'react'
import Layout from '../components/Layout/Layout'
import chef from "../assets/chef1.png";


const MessagePage = () => {
  return (
    <Layout>
      <div className="w-full h-[81vh] sm:h-full bg-cartBg flex items-center justify-center rounded-t-[2rem]">
              <div className="w-full flex flex-col items-center gap-4">
                <p className="text-2xl  text-[#b8b5b4] text-center pt-1 ">
                  The feature is not yet available.
                </p>
                {/* <img src={chef} alt="" className="w-[250px] h-[250px]" /> */}
              </div>
            </div>
    </Layout>
  )
}

export default MessagePage
