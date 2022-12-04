import React, { useState } from "react";
import { Button } from "@mui/material";
import Courses from "./Courses";
import DisplayStudents from "./DisplayStudents";
import { FORM_OPTIONS } from "../constants/variables";
import DisplayStudentForms from "./DisplayStudentForms";

export default function DisplayData() {
  const [activeForm, setActiveForm] = useState(FORM_OPTIONS.none);

  const formButtonOptions = [
    {
      title: "Create student",
      submit: () => setActiveForm(FORM_OPTIONS.createStudent),
    },
    {
      title: "Delete student",
      submit: () => setActiveForm(FORM_OPTIONS.deleteStudent),
    },
    {
      title: "Update username",
      submit: () => setActiveForm(FORM_OPTIONS.updateUsername),
    },
  ];

  return (
    <div>
      <h1>Students:</h1>
      <div className="studentButtonsContainer">
        {formButtonOptions.map((button, index) => {
          const { title, submit } = button;
          return (
            <Button variant="outlined" onClick={submit} key={index}>
              {title}
            </Button>
          );
        })}
      </div>
      <DisplayStudentForms
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />
      <DisplayStudents />
      <Courses />
    </div>
  );
}
