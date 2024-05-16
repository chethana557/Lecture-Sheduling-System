import React from "react";
import { Link } from "react-router-dom";
import "./Lregister.css";
import { FaUser, FaChalkboardTeacher, FaGraduationCap, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

const Lregister = () => {
  const gmailAddress = "mailto:chethana537@gmail.com";
  return (
    <div className="admin-dashboard">
      <header className="home-header">
        <h1 className="dashboard-title">ADMIN DASHBOARD</h1>
        <div className="button-container">
        <a href={gmailAddress} target="_blank" rel="noopener noreferrer">
            <button className="dashboard-button request-button">Requests</button>
          </a>
          

          <Link to="/users">
            <button className="dashboard-button">
              <FaChalkboardTeacher className="button-icon" />
              Lecturers
            </button>
          </Link>

          <Link to="/students">
            <button className="dashboard-button">
              <FaGraduationCap className="button-icon" />
              Students
            </button>
          </Link>

          <Link to="/courses">
            <button className="dashboard-button">
              <FaClipboardList className="button-icon" />
               Modules
            </button>
          </Link>

          <Link to="/timetables">
            <button className="dashboard-button">
              <FaCalendarAlt className="button-icon" />
              Time Table
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Lregister;
