// Navbar.jsx
import React from 'react';
import MenuLink from '../navbar/MenuLink/MenuLink';
import logo from '../../assets/pictures/KDU.png'
import './navbar.css'

const CustomNavbar = () => {
  return (
    <div id ="navcontent">
      <a href='#'> <img src={logo} alt="React" className="logo" />Faculty Of Technology</a>
      <div>
        <MenuLink linkname="Home" url ='http://localhost:5173/#About'/>
        <MenuLink linkname="About" url ='http://localhost:5173/aboutUs'/>
        <MenuLink linkname="Contact" url ='#Contact'/>
        
      </div>
    </div>
    
  );
};

export default CustomNavbar;
