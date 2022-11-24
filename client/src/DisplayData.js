import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import Courses from "./Courses";
import UserContext from "./context";
import {
  QUERY_ALL_USERS,
  DELETE_USER_MUTATION,
  UPDATE_USERNAME_MUTATION,
} from "./services/userService";
import CreateStudent from "./CreateStudent";
import DisplayStudents from "./DisplayStudents";

export default function DisplayData() {
  const { username, setUsername, userId, setUserId } = useContext(UserContext);

  const [studentsEditForm, setStudentsEditForm] = useState(false);

  const { refetch } = useQuery(QUERY_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);

  return (
    <div>
      <h1>Students:</h1>
      <div>
        <button onClick={() => setStudentsEditForm(!studentsEditForm)}>
          Create student
        </button>
        <button onClick={() => setStudentsEditForm(true)}>
          Delete a student
        </button>
        <button onClick={() => setStudentsEditForm(true)}>
          Update username
        </button>
      </div>
      <div className={`studentsOptions`}>
        <div className={`options new ${studentsEditForm ? "open" : null}`}>
          <CreateStudent />
        </div>
        <div className={`options ${studentsEditForm ? "open" : null}`}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "270px" },
            }}
          >
            <TextField
              type="text"
              label="User Id"
              onChange={(e) => setUserId(e.target.value)}
            />
          </Box>
          <Button
            id="button"
            onClick={() => {
              deleteUser({
                variables: {
                  id: Number(userId),
                },
              });
              refetch();
            }}
            variant="outlined"
          >
            Delete Student
          </Button>
        </div>
        <div className={`options ${studentsEditForm ? "open" : null}`}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "270px" },
            }}
            autoComplete="off"
          >
            <h3>Update student username:</h3>
            <TextField
              type="text"
              label="Student Id"
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              type="text"
              label="New username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Button
            id="button"
            onClick={() => {
              updateUsername({
                variables: {
                  input: { id: Number(userId), newUsername: username },
                },
              });
              refetch();
            }}
            variant="outlined"
          >
            Delete Student
          </Button>
        </div>
      </div>
      <DisplayStudents />
      <Courses />
    </div>
  );
}
