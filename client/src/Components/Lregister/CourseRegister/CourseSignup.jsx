import React, { useState } from "react";
import "./coursesignup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CourseSignup = () => {
  const [coursename, setCoursename] = useState("");
  const [courseId, setCourseId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/api/courses/", {
      courseId,  
      coursename,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ background: "#dddddd" }} className="sign-up-container">
      <form style={{ background: "#EEE3CD" }} className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Course Registration</h2>
        <label htmlFor="coursename">Coursename:</label>
        <input
          type="text"
          placeholder="Coursename"
          onChange={(e) => setCoursename(e.target.value)}
        />

        <label htmlFor="courseId">CourseId:</label>
        <input
          type="text"
          placeholder="CourseId"
          onChange={(e) => setCourseId(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          autoComplete="off"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>
          Have an account? <Link to="/courselogin">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default CourseSignup;
