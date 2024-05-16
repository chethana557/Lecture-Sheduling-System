import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Axios from "axios";

const BasicCoursesTable = ({ rows, updateCourse, deleteCourse }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Coursename</TableCell>
          <TableCell>Course ID</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.coursename}
              </TableCell>
              <TableCell>{row.courseId}</TableCell>
              <TableCell>
                <Button
                  sx={{ margin: "0px 10px" }}
                  onClick={() =>
                    updateCourse(row._id, row.coursename, row.courseId)
                  }
                >
                  Update
                </Button>
                <Button
                  sx={{ margin: "0px 10px" }}
                  onClick={() => deleteCourse({ id: row._id })}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell colSpan={3}>No data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const CoursesTable = ({
  isUpdated,
  setIsUpdated,
  rows,
  selectedCourse,
  handleOpenUpdate,
  Tabletype,
}) => {
  const deleteCourse = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) {
      return; // User canceled the operation, do nothing
    }

    let route = "";
    if (Tabletype === "timetable") {
      route = "timetables";
    } else {
      route = "courses";
    }

    Axios.delete(`http://localhost:3000/api/${route}/${id.id}`)
      .then((response) => {
        console.log("Course deleted successfully.", response);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const updateCourse = (id, coursename, courseId) => {
    console.log("updateCourse", id, coursename, courseId);

    selectedCourse({
      id: id,
      coursename: coursename,
      courseId: courseId,
    });

    handleOpenUpdate();
  };

  return (
    // Conditionally render either the timetable or the basic table
    Tabletype == "timetable" ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coursename</TableCell>
              <TableCell>Course ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Lecturer Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.coursename}
                  </TableCell>
                  <TableCell>{row.courseId}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.lecturerName}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ margin: "0px 10px" }}
                      onClick={() =>
                        updateCourse(row._id, row.coursename, row.courseId)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      sx={{ margin: "0px 10px" }}
                      onClick={() => deleteCourse({ id: row._id })}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={6}>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <BasicCoursesTable
        rows={rows}
        updateCourse={updateCourse}
        deleteCourse={deleteCourse}
      />
    )
  );
};

export default CoursesTable;
