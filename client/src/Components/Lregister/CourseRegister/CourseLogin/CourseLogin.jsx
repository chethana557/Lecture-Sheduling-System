import React, { useState } from "react";
import "./courselogin.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CourseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ background: "#dddddd" }} className="sign-up-container">
      <form
        style={{ background: "#EEE3CD" }}
        className="sign-up-form"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

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
        <Link to="/courses">
        <button type="submit">Login</button></Link>
        <p>
          Don't have account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default CourseLogin;
