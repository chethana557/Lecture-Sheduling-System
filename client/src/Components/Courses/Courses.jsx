import { Box, Button, Modal } from "@mui/material";
import Courseform from "../Courses/Courseform";
import CourseTable from "../Courses/CoursesTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import './Courses.css';

const Courses = () => {
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
    Axios.get("http://localhost:3000/api/courses")
      .then((response) => {
        setCourses(response.data || []);
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
    <div className="Courses-background">
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      
      {/* <Courseform
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        data={selectedCourse}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      /> */}

      <h3>Courses</h3>
      <Button  onClick={handleOpen}>Add courses</Button>
      <div className="card">
      <CourseTable 
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        rows={courses}
        selectedCourse={(data) => {
          setSelectedCourse(data);
          setIsEdit(true);
        }}
        handleOpenUpdate={handleOpenUpdate}
      />
</div>
     

      {/* Add modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Courseform
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
          <Courseform
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            data={selectedCourse}
            isEdit={true}
            setIsEdit={setIsEdit}
          />
        </Box>
      </Modal>
    </Box>
    </div>
    
  );
};

export default Courses;
