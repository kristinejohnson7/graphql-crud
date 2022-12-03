import React, { ChangeEventHandler } from "react";
import { TextField } from "@mui/material";

type InputFields  = {
  input: {
    label: string,
    type: string,
    value: string,
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  }
}

export default function Input({input}: InputFields ) {
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
