import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Courses from "./Courses";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "30px",
  textAlign: "left",
  color: theme.palette.text.secondary,
  minWidth: "200px",
}));

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      house
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

export default function DisplayData() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [house, setHouse] = useState("");
  const [userId, setUserId] = useState(0);

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <h1>Students:</h1>

      <div className="studentsOptions">
        <div className="options new">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "270px" },
            }}
            notValidate
            autoComplete="off"
          >
            <h3>Create a new student:</h3>
            <TextField
              type="text"
              label="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="text"
              label="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="number"
              label="Age"
              required
              onChange={(e) => setAge(e.target.value)}
            />
            <Select
              type="text"
              label="House"
              required
              onChange={(e) => setHouse(e.target.value.toUpperCase())}
            >
              <MenuItem value="Slytherin">Slytherin</MenuItem>
              <MenuItem value="Ravenclaw">Ravenclaw</MenuItem>
              <MenuItem value="Hufflepuff">Hufflepuff</MenuItem>
              <MenuItem value="Gryffindor">Gryffindor</MenuItem>
            </Select>
          </Box>
          <Button
            variant="outlined"
            id="button"
            onClick={() => {
              createUser({
                variables: {
                  input: { name, username, age: Number(age), house },
                },
              });
              refetch();
            }}
          >
            Create
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
            <h3>Delete a student:</h3>
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
