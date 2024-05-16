import { Grid, Input, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import "./users.css"; // Import the CSS file

const Userform = ({ isUpdated, setIsEdit, setIsUpdated, data, isEdit }) => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUser = () => {
    const updatedUserData = {
      username: username,
      email: email,
    };

    Axios.put(`http://localhost:3000/api/users/${id}`, updatedUserData)
      .then((response) => {
        console.log("User updated successfully.", response);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  useEffect(() => {
    setIsEdit(false);
    setId("");
    setUsername("");
    setEmail("");
    setPassword("");
  }, [isUpdated]);

  const addUser = () => {
    Axios.post("http://localhost:3000/api/users/signup", {
      username: username,
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
      setUsername(data.username);
      setEmail(data.email);
    }
  }, [data]);

  return (
    <div className="user-form-container">
      <div className="background-image"></div> {/* Background image */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Lecturer Register form
          </Typography>
          <Link to="/entryreg">
              <Button variant="contained" className="add-button">
                Add   Lecturer
              </Button>
            </Link>
        </Grid>

        {isEdit && (
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography
              component={"label"}
              htmlFor="id"
              sx={{
                color: "#000000",
                marginRight: "20px",
                fontSize: "16px",
                width: "100px",
              }}
            >
              ID
            </Typography>
            <Input
              type="name"
              id="id"
              name="id"
              disabled
              sx={{ width: "400px" }}
              value={id}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
          <Typography
            component={"label"}
            htmlFor="username"
            sx={{
              color: "#00000",
              marginRight: "20px",
              fontSize: "16px",
              width: "100px",
            }}
          >
            Username
          </Typography>
          <Input
            type="text"
            id="username"
            name="username"
            sx={{ width: "400px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
          <Typography
            component={"label"}
            htmlFor="email"
            sx={{
              color: "#00000",
              marginRight: "20px",
              fontSize: "16px",
              width: "100px",
            }}
          >
            Email
          </Typography>
          <Input
            type="email"
            id="email"
            name="email"
            sx={{ width: "400px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        {!isEdit && (
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography
              component={"label"}
              htmlFor="password"
              sx={{
                color: "#00000",
                marginRight: "20px",
                fontSize: "16px",
                width: "100px",
              }}
            >
              Password
            </Typography>
            <Input
              type="password"
              id="password"
              name="password"
              sx={{ width: "400px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            className="submit-button"
            onClick={() => (isEdit ? updateUser() : addUser())}
            startIcon={isEdit ? <UpdateIcon /> : null}
            endIcon={isEdit ? null : <DeleteIcon />}
          >
            {isEdit ? "Update" : "Update Lecturer"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Userform;
