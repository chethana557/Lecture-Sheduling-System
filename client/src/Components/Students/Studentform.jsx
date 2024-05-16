import { Grid, Input, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./students.css"; // Import the CSS file

const Studentform = ({ isUpdated, setIsEdit, setIsUpdated, data, isEdit }) => {
  const [id, setId] = useState("");
  const [studentname, setStudentname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateStudent = () => {
    const updatedStudentData = {
      studentname: studentname,
      email: email,
    };
    console.log("updatedStudentData", updatedStudentData);

    Axios.put(`http://localhost:3000/api/students/${id}`, updatedStudentData)
      .then((response) => {
        console.log("Student updated successfully.", response);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  useEffect(() => {
    setIsEdit(false);
    setId("");
    setStudentname("");
    setEmail("");
    setPassword("");
  }, [isUpdated]);

  const addStudent = () => {
    Axios.post("http://localhost:3000/api/users/signup", {
      studentname: studentname,
      email: email,
      password: password,
    })
      .then(() => {
        setIsUpdated(!isUpdated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setStudentname(data.studentname);
      setEmail(data.email);
    }
  }, [data]);

  return (
    <div className="student-form-container">
      <div className="background-image"></div> {/* Background image */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Student Registration
          </Typography>
          {!isEdit && (
            <Link to="/studentryreg">
              <Button variant="contained" className="add-button">
                Add Student
              </Button>
            </Link>
          )}
        </Grid>

        {isEdit && (
          <Grid item xs={12} sm={6}>
            <Typography component="label" htmlFor="id">
              ID
            </Typography>
            <Input
              type="text"
              id="id"
              name="id"
              disabled
              value={id}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Typography component="label" htmlFor="studentname">
            Student Name
          </Typography>
          <Input
            type="text"
            id="studentname"
            name="studentname"
            value={studentname}
            onChange={(e) => setStudentname(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography component="label" htmlFor="email">
            Email
          </Typography>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        {!isEdit && (
          <Grid item xs={12} sm={6}>
            <Typography component="label" htmlFor="password">
              Password
            </Typography>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            className="submit-button"
            onClick={() => (isEdit ? updateStudent() : addStudent())}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Studentform;
