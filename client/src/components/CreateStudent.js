import React, { useContext } from "react";
import Input from "./Input";
import { houses } from "../constants/variables";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import UserContext from "../context";
import { QUERY_ALL_USERS, CREATE_USER_MUTATION } from "../services/userService";

export default function CreateStudent() {
  const { name, setName, age, setAge, username, setUsername, house, setHouse } =
    useContext(UserContext);

  const newStudentInputs = [
    {
      type: "text",
      label: "Name",
      change: (e) => setName(e.target.value),
      value: name,
    },
    {
      type: "text",
      label: "Username",
      value: username,
      change: (e) => setUsername(e.target.value),
    },
    {
      type: "number",
      label: "Age",
      value: age,
      change: (e) => setAge(e.target.value),
    },
  ];

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const { refetch } = useQuery(QUERY_ALL_USERS);

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "270px" },
        }}
        autoComplete="off"
      >
        {newStudentInputs.map((input, index) => (
          <Input input={input} key={index} />
        ))}
        <Select
          labelId="house-name"
          label="House"
          required
          onChange={(e) => setHouse(e.target.value.toUpperCase())}
        >
          {houses.map((houseName, index) => (
            <MenuItem value={houseName} key={index}>
              {houseName}
            </MenuItem>
          ))}
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
          setHouse("");
          setAge("");
          setName("");
          setUsername("");
        }}
      >
        Create
      </Button>
    </div>
  );
}
