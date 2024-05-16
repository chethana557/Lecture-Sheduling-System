import { Box } from "@mui/material";
import Courseform from "../Courses/Courseform";
import CourseTable from "../Courses/CoursesTable";
import Axios from "axios";
import { useEffect, useState } from "react";

const Timetables = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getCourses();
  }, [isUpdated]);

  const getCourses = () => {
    Axios.get("http://localhost:3000/api/timetables")
      .then((response) => {
        setCourses(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Courseform
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        data={selectedCourse}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <h3>Course Table</h3>
      <CourseTable
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        rows={courses}
        selectedCourse={(data) => {
          setSelectedCourse(data);
          setIsEdit(true);
        }}
      />
    </Box>
  );
};

export default Timetables;
