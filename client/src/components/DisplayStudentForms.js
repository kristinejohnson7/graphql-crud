import React, { useContext } from "react";
import { FORM_OPTIONS } from "../constants/variables";
import StudentForm from "./StudentForm";
import CreateStudent from "./CreateStudent";
import UserContext from "../context";
import {
  QUERY_ALL_USERS,
  DELETE_USER_MUTATION,
  UPDATE_USERNAME_MUTATION,
} from "../services/userService";
import { useQuery, useMutation } from "@apollo/client";

export default function DisplayStudentForms({ activeForm, setActiveForm }) {
  const { username, setUsername, userId, setUserId } = useContext(UserContext);

  const { refetch } = useQuery(QUERY_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);

  const studentUpdateUsernameData = {
    button: "Update",
    submit: () => {
      updateUsername({
        variables: {
          input: { id: Number(userId), newUsername: username },
        },
      });
      refetch();
      setUserId("");
      setUsername("");
    },
    inputs: [
      {
        type: "text",
        label: "Student ID",
        value: userId,
        change: (e) => setUserId(e.target.value),
      },
      {
        type: "text",
        label: "New  username",
        value: username,
        change: (e) => setUsername(e.target.value),
      },
    ],
  };

  const studentDeleteData = {
    button: "Delete",
    submit: () => {
      deleteUser({
        variables: {
          id: Number(userId),
        },
      });
      refetch();
      setUserId("");
    },
    inputs: [
      {
        type: "text",
        label: "User Id",
        value: userId,
        change: (e) => setUserId(e.target.value),
      },
    ],
  };

  const generateStudentFormOptions = [
    {
      render: activeForm === FORM_OPTIONS.createStudent ? "open" : null,
      title: "Create a student",
      component: <CreateStudent />,
    },
    {
      render: activeForm === FORM_OPTIONS.deleteStudent ? "open delete" : null,
      title: "Delete a student",
      component: <StudentForm data={studentDeleteData} />,
    },
    {
      render: activeForm === FORM_OPTIONS.updateUsername ? "open" : null,
      title: "Update student username",
      component: <StudentForm data={studentUpdateUsernameData} />,
    },
  ];

  return (
    <div className={`studentsOptions`}>
      {generateStudentFormOptions.map((form, index) => {
        const { render, title, component } = form;
        return (
          <div className={`options ${render}`} key={index}>
            <div className="formHeader">
              <h4>{title}:</h4>
              <div
                className="exitButton"
                onClick={() => setActiveForm(FORM_OPTIONS.none)}
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
            {component}
          </div>
        );
      })}
    </div>
  );
}
