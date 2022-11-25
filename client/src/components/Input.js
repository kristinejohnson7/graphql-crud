import React from "react";
import { TextField } from "@mui/material";

export default function Input({ input }) {
  const { label, type, change } = input;
  return <TextField type={type} label={label} required onChange={change} />;
}
