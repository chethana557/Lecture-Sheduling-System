import React from 'react';
import "./footer.css"


const Footer = () => {

    const currentYear = new Date().getFullYear();
    return (
        <footer> © MetaWorkForce | All Right Reserved {currentYear}</footer>
    
    );

}

export default Footer;