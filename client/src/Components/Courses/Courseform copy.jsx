import { Grid, Input, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";

const Courseform = ({ isUpdated, setIsEdit, setIsUpdated, data, isEdit }) => {
  const [id, setId] = useState("");
  const [coursename, setCoursename] = useState("");
  const [courseId, setCourseId] = useState("");

  const updateCourse = () => {
    const updatedCourseData = {
      coursename: coursename,
      courseId: courseId,
    };

    Axios.put(`http://localhost:3000/api/courses/${id}`, updatedCourseData)
      .then((response) => {
        console.log("Course updated successfully.", response);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  useEffect(() => {
    setIsEdit(false);
    setId("");
    setCoursename("");
    setCourseId("");
  }, [isUpdated]);

  const addCourse = () => {
    Axios.post("http://localhost:3000/api/courses/addcourse", {
      coursename: coursename,
      courseId: courseId,
    })
      .then((response) => {
        console.log("Course added successfully.", response);
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
      setCoursename(data.coursename);
      setCourseId(data.courseId);
    }
  }, [data]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: "#333", marginBottom: "20px" }}>
          {isEdit ? "Edit Course" : "Add New Course"}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>
          Course Name
        </Typography>
        <Input
          value={coursename}
          onChange={(e) => setCoursename(e.target.value)}
          fullWidth
          placeholder="Enter course name"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>
          Course ID
        </Typography>
        <Input
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          fullWidth
          placeholder="Enter course ID"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => (isEdit ? updateCourse() : addCourse())}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {isEdit ? "Update Course" : "Add Course"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Courseform;
