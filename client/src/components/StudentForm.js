import React from "react";
import { Box, Button } from "@mui/material";
import Input from "./Input";

export default function StudentForm({ data }) {
  const { submit, button, inputs } = data;

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "270px" },
        }}
        autoComplete="off"
      >
        {inputs.map((input, index) => (
          <Input input={input} key={index} />
        ))}
      </Box>
      <Button id="button" onClick={submit} variant="outlined">
        {button}
      </Button>
    </>
  );
}
