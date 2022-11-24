import React, { useState, useContext } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Courses from "./Courses";
import Input from "./Input";
import { houses } from "./constants/variables";
import UserContext from "./context";
import {
  QUERY_ALL_USERS,
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USERNAME_MUTATION,
} from "./services/userService";
import CreateUser from "./CreateUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "30px",
  textAlign: "left",
  color: theme.palette.text.secondary,
  minWidth: "200px",
}));

export default function DisplayData() {
  const {
    name,
    setName,
    age,
    setAge,
    username,
    setUsername,
    house,
    setHouse,
    userId,
    setUserId,
  } = useContext(UserContext);

  const [studentsEditForm, setStudentsEditForm] = useState(false);

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

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
          <CreateUser />
        </div>
        <div className="options">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "270px" },
            }}
            notValidate
            autoComplete="off"
          >
            {/* <h3>Delete a student:</h3> */}
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
        <div className="options">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "270px" },
            }}
            notValidate
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
              console.log(username);
              refetch();
            }}
            variant="outlined"
          >
            Delete Student
          </Button>
        </div>
      </div>
      {data.users && (
        <>
          <h3>All students:</h3>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {data.users.map((user) => {
                const { name, age, username, id, house } = user;
                return (
                  <Grid sx={5} item>
                    <Item key={id} variant="outlined">
                      <h3>Name: {name}</h3>
                      <h3>Id: {id}</h3>
                      <h3>Username: {username}</h3>
                      <h3>Age: {age}</h3>
                      <h3>House: {house}</h3>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </>
      )}
      <Courses />
    </div>
  );
}
