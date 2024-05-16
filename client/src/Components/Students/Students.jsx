import { Box } from "@mui/material";
import Studentform from "./Studentform";
import StudentsTable from "./StudentsTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import "./students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getStudents();
  }, [isUpdated]);

  const getStudents = () => {
    Axios.get("http://localhost:3000/api/students")
      .then((response) => {
        setStudents(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <div className="student1">
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Studentform
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        data={selectedStudent}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <h3>Students</h3>
      <StudentsTable
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        rows={students}
        selectedStudent={(data) => {
          setSelectedStudent(data);
          setIsEdit(true);
        }}
      />
    </Box>
    </div>
  );
};

export default Students;
