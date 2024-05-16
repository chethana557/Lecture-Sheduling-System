import React from "react";
import { Link } from "react-router-dom";
import "./lognavigate.css";

const Home = () => {
  return (
    <div
      className="Home"
      
    >
      <div className="container">
        <div className="left">
         
          
        </div>
        <div className="right">
          <img
            src=""
            alt=""
            className="image"
          />
        </div>
      </div>

      <div className="centered">
        <Link to="/timetables" className="link">
          <button className="users-button">Student</button>
        </Link>
        <Link to="/timetables" className="link">
          <button className="users-button">Lecturer</button>
        </Link><Link to="/Lregister" className="link">
          <button className="users-button">Admin</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Home;
