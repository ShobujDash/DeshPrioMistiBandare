import React from 'react'
import Header from '../header/Header'
import MainContainer from "../home/MainContainer";
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      
      {
        children
      }
      <Footer />
    </>
  );
}

export default Layout
