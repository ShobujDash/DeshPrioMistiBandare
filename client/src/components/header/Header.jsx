import React from 'react'
import logo from '../../assets/rasgulla.png'

import { Link } from 'react-router-dom'
import DextopNavbar from './DextopNavbar';
import MobileNavbar from './MobileNavbar';

const Header = () => {

  return (
    <header className="fixed bg-primary bg-opacity-70 z-50 w-screen md:py-4 py-2 md:px-16 px-6">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-2xl font-bold">দেশপ্রিয়</p>
        </Link>

        {/* Dextop NavBar */}
        <DextopNavbar />
      </div>

      {/* mobile NavBar*/}
      <MobileNavbar />
    </header>
  );
}

export default Header