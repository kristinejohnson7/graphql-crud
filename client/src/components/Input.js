import React from "react";
import { TextField } from "@mui/material";

export default function Input({ input }) {
  const { label, type, change, value } = input;
  return (
    <TextField
      type={type}
      label={label}
      value={value}
      required
      onChange={change}
    />
  );
}
