import React from 'react'
import Header from '../header/Header'
import MainContainer from "../home/MainContainer";
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <main className="mt-14 md:mt-20 md:px-16 bg-primary px-8 py-4 w-full">
        <MainContainer />
      </main>
      <Footer />
    </>
  );
}

export default Layout
