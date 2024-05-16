import React from "react";
import logolmp1 from '../../assets/pictures/lmp.png';
import { Link } from "react-router-dom";
import './home.css';

const Home = () => {
  return (
    <div
      className="Home1">
      <div className="container">
        <div className="left1">
          <img src={logolmp1} alt="React" className="logo" />
          
          <p className="description1">
            Welcome to the Lecture Management System (LMS), a comprehensive
            platform designed to streamline the administration and delivery of
            educational lectures within academic institutions. Our system aims
            to revolutionize the way lectures are organized, accessed, and
            managed, providing both educators and students with a seamless
            experience. With LMS, educators can effortlessly create, schedule,
            and manage lectures for various courses and subjects. They can
            upload lecture materials such as presentations, documents, and
            multimedia files, ensuring that students have access to all relevant
            resources. Additionally, educators can set deadlines for
            assignments, quizzes, and other assessments, keeping students
            informed and accountable.
          </p>
        </div>
      </div>

      <div className="centered1">
        <Link to="/Login" >
        <button className="buttn">LOGIN</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Home;
