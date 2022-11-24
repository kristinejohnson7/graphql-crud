import React from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "./services/userService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "30px",
  textAlign: "left",
  color: theme.palette.text.secondary,
  minWidth: "200px",
}));

export default function DisplayStudents() {
  const { data, loading } = useQuery(QUERY_ALL_USERS);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <>
      {data.users && (
        <>
          <h3>All students:</h3>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {data.users.map((user) => {
                const { name, age, username, id, house } = user;
                return (
                  <Grid sx={5} item key={id}>
                    <Item variant="outlined">
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
    </>
  );
}
