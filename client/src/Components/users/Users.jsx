import { Box } from "@mui/material";
import Userform from "./Userform";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import './users.css'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getUsers();
  }, [isUpdated]);

  const getUsers = () => {
    Axios.get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <div className="background-users"> {/* Apply the background class here */}
      <Box
        sx={{
          width: "calc(100% - 100px)",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Userform
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          data={selectedUser}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <h3>Lecturers</h3>
        <UsersTable
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          rows={users}
          selectedUser={(data) => {
            setSelectedUser(data);
            setIsEdit(true);
          }}
        />
      </Box>
    </div>
  );
};

export default Users;
