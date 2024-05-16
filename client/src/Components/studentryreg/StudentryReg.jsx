import React, { useState } from "react";
import './StudentryReg.css';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const StudEntryReg = () => {
  const [studentname, setStudentname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentname || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    Axios.post("http://localhost:3000/api/students/studentryreg", {
      studentname,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/students");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Student Register Form</h2>
        <label htmlFor="studentname">Student name:</label>
        <input
          type="text"
          placeholder="Studentname"
          onChange={(e) => setStudentname(e.target.value)}
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

       <button type="submit">Register</button>
        <p>
         
        </p>
      </form>
      
    </div>
  );
};

export default StudEntryReg;
