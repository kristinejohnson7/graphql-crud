import React, { useContext } from "react";
import Input from "./Input";
import { houses } from "./constants/variables";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import UserContext from "./context";
import { QUERY_ALL_USERS, CREATE_USER_MUTATION } from "./services/userService";

export default function CreateUser() {
  const { name, setName, age, setAge, username, setUsername, house, setHouse } =
    useContext(UserContext);

  const newStudentInputs = [
    { type: "text", label: "Name", change: (e) => setName(e.target.value) },
    {
      type: "text",
      label: "Username",
      change: (e) => setUsername(e.target.value),
    },
    { type: "number", label: "Age", change: (e) => setAge(e.target.value) },
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
        notValidate
        autoComplete="off"
      >
        {newStudentInputs.map((input) => (
          <Input input={input} />
        ))}
        <Select
          type="text"
          label="House"
          required
          onChange={(e) => setHouse(e.target.value.toUpperCase())}
        >
          {houses.map((house, index) => (
            <MenuItem value={house} key={index}>
              {house}
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
        }}
      >
        Create
      </Button>
    </div>
  );
}
