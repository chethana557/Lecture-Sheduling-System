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
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import './users.css'

const UsersTable = ({ isUpdated, setIsUpdated, rows, selectedUser }) => {
  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) {
      return; // User canceled the operation, do nothing
    }

    Axios.delete(`http://localhost:3000/api/users/${id.id}`)
      .then((response) => {
        console.log("User deleted successfully.", response);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell className="table-cell">ID</TableCell>
            <TableCell className="table-cell">Username</TableCell>
            <TableCell className="table-cell">Email</TableCell>
            <TableCell className="table-cell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="table-cell">
                  {row._id}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {row.username}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {row.email}
                </TableCell>
                <TableCell className="table-cell">
                  <Button
                    className="update-btn"
                    sx={{ margin: "0px 10px" }}
                    onClick={() =>
                      selectedUser({
                        id: row._id,
                        username: row.username,
                        email: row.email,
                      })
                    }
                    startIcon={<UpdateIcon />}
                  >
                    Update
                  </Button>
                  <Button
                    className="delete-btn"
                    sx={{ margin: "0px 10px" }}
                    onClick={() => deleteUser({ id: row._id })}
                    startIcon={<DeleteIcon />}
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
              <TableCell component="th" scope="row" className="table-cell">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UsersTable;
