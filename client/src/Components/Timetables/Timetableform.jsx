import { Grid, Input, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";

const Timetableform = ({
  isUpdated,
  setIsEdit,
  setIsUpdated,
  data,
  isEdit,
}) => {
  const [id, setId] = useState("");
  const [coursename, setCoursename] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState(""); // Set default value to empty string
  const [time, setTime] = useState(""); // Set default value to empty string
  const [lecturerName, setLecturerName] = useState(""); // Set default value to empty string

  console.log("isEdit", isEdit);

  const updateTimetable = () => {
    const updatedTimetableData = {
      coursename: coursename,
      courseId: courseId,
      date: date,
      time: time,
      lecturerName: lecturerName,
    };

    Axios.put(
      `http://localhost:3000/api/timetables/${id}`,
      updatedTimetableData
    )
      .then((response) => {
        console.log("Timetable updated successfully.", response);
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
    setDate(""); // Reset date to empty string
    setTime(""); // Reset time to empty string
    setLecturerName(""); // Reset lecturerName to empty string
    console.log("useEffect 1");
  }, [isUpdated]);

  const addCourse = () => {
    Axios.post("http://localhost:3000/api/timetables/addTimetable", {
      coursename: coursename,
      courseId: courseId,
      date: date,
      time: time,
      lecturerName: lecturerName,
    })
      .then((response) => {
        console.log("Timetable added successfully.", response);
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
      setDate(data.date);
      setTime(data.time);
      setLecturerName(data.lecturerName);
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
          {isEdit ? "Edit Timetable" : "Add New Timetable"}
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
          placeholder="Enter Timetable name"
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
          placeholder="Enter Timetable ID"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>Date</Typography>
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          placeholder="Enter date"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>Time</Typography>
        <Input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          placeholder="Enter time"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>
          Lecturer Name
        </Typography>
        <Input
          value={lecturerName}
          onChange={(e) => setLecturerName(e.target.value)}
          fullWidth
          placeholder="Enter lecturer name"
          sx={{ marginTop: "8px" }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => (isEdit ? updateTimetable() : addCourse())}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {isEdit ? "Update Timetable" : "Add Timetable"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Timetableform;
