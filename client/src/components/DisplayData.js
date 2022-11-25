import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import Courses from "./Courses";
import UserContext from "../context";
import {
  QUERY_ALL_USERS,
  DELETE_USER_MUTATION,
  UPDATE_USERNAME_MUTATION,
} from "../services/userService";
import CreateStudent from "./CreateStudent";
import DisplayStudents from "./DisplayStudents";
import StudentForm from "./StudentForm";

export default function DisplayData() {
  const { username, setUsername, userId, setUserId } = useContext(UserContext);

  const [studentsEditForm, setStudentsEditForm] = useState(false);

  const { refetch } = useQuery(QUERY_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);

  const studentUpdateUsernameData = {
    button: "Update",
    submit: () => {
      updateUsername({
        variables: {
          input: { id: Number(userId), newUsername: username },
        },
      });
      refetch();
    },
    inputs: [
      {
        type: "text",
        label: "Student ID",
        change: (e) => setUserId(e.target.value),
      },
      {
        type: "text",
        label: "New  username",
        change: (e) => setUsername(e.target.value),
      },
    ],
  };

  const studentDeleteData = {
    button: "Delete",
    submit: () => {
      deleteUser({
        variables: {
          id: Number(userId),
        },
      });
      refetch();
    },
    inputs: [
      {
        type: "text",
        label: "User Id",
        change: (e) => setUserId(e.target.value),
      },
    ],
  };

  return (
    <div>
      <h1>Students:</h1>
      <div className="studentButtonsContainer">
        <Button
          variant="outlined"
          onClick={() => setStudentsEditForm(!studentsEditForm)}
        >
          Create student
        </Button>
        <Button variant="outlined" onClick={() => setStudentsEditForm(true)}>
          Delete a student
        </Button>
        <Button variant="outlined" onClick={() => setStudentsEditForm(true)}>
          Update username
        </Button>
      </div>
      <div className={`studentsOptions`}>
        <div className={`options new ${studentsEditForm ? "open" : null}`}>
          <CreateStudent />
        </div>
        <div className={`options ${studentsEditForm ? "open" : null}`}>
          <StudentForm data={studentDeleteData} />
        </div>
        <div className={`options ${studentsEditForm ? "open" : null}`}>
          <StudentForm data={studentUpdateUsernameData} />
        </div>
      </div>
      <DisplayStudents />
      <Courses />
    </div>
  );
}
