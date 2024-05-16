import { Box, Button, Modal } from "@mui/material";
import CourseTable from "../Courses/CoursesTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import Timetableform from "./Timetableform";
import { Link } from "react-router-dom";
import './Timetables.css';

const Timetables = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    handleClose();
    handleCloseUpdate();
    getCourses();
  }, [isUpdated]);

  const getCourses = () => {
    Axios.get("http://localhost:3000/api/timetables")
      .then((response) => {
        setCourses(response.data || []);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpenUpdate = () => {
    setIsEdit(true);
    setOpenModalUpdate(true);
  };

  const handleCloseUpdate = () => {
    setIsEdit(false);
    setOpenModalUpdate(false);
  };

  return (
    <div className="timetable-back">
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <h3>Time Table</h3>
      {/* <Link to="/request">
       
        <Button>Request</Button>
      </Link> */}
      <Button onClick={handleOpen}>Add Timetable</Button>
      <CourseTable
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        rows={courses}
        selectedCourse={(data) => {
          setSelectedCourse(data);
          setIsEdit(true);
        }}
        handleOpenUpdate={handleOpenUpdate}
        Tabletype={"timetable"}
      />

      
      

      {/* Add modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Timetableform
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </Box>
      </Modal>

      {/* Update modal */}
      <Modal
        open={openModalUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Timetableform
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            data={selectedCourse}
            isEdit={true}
            setIsEdit={setIsEdit}
          />
        </Box>
      </Modal>

      {/* Button to navigate to another page */}
      
    </Box>
    </div>
  );
};

export default Timetables;
