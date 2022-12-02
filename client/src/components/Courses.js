import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useQuery, useLazyQuery } from "@apollo/client";
import { styled } from "@mui/material/styles";
import {
  QUERY_ALL_COURSES,
  GET_COURSE_BY_NAME,
} from "../services/courseService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "30px",
  textAlign: "left",
  color: theme.palette.text.secondary,
  minWidth: "200px",
}));

export default function Courses() {
  const [courseSearched, setCourseSearched] = useState("");
  const [studentsEditForm, setStudentsEditForm] = useState(false);

  const { data: courseData } = useQuery(QUERY_ALL_COURSES);
  const [
    fetchCourse,
    { data: courseSearchedData, error: courseSearchedError },
  ] = useLazyQuery(GET_COURSE_BY_NAME);

  return (
    <div className="courses">
      <h1>Courses:</h1>
      <Button
        onClick={() => setStudentsEditForm(!studentsEditForm)}
        variant="outlined"
      >
        Search for a course
      </Button>
      {courseData && (
        <>
          <div className={`options ${studentsEditForm ? "open" : null}`}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "370px" },
              }}
              autoComplete="off"
            >
              <h3>Search for a course:</h3>
              <TextField
                type="text"
                label="Charms"
                value={courseSearched}
                required
                onChange={(e) => {
                  setCourseSearched(e.target.value);
                }}
              />
            </Box>
            <Button
              variant="outlined"
              style={{ width: 370, margin: 8 }}
              onClick={() => {
                fetchCourse({
                  variables: {
                    name: courseSearched,
                  },
                });
                setCourseSearched("");
              }}
            >
              Search
            </Button>
            <div>
              {courseSearchedData && (
                <div className="reveal">
                  <h3>Course Name: {courseSearchedData.course.name}</h3>
                  <h3>Professor: {courseSearchedData.course.professor}</h3>
                </div>
              )}
              {courseSearchedError && (
                <h2>There was an error fetching the course</h2>
              )}
            </div>
          </div>
          <Box>
            <h3>All courses:</h3>
            <Grid container spacing={2}>
              {courseData.courses.map((course) => {
                const { name, id, professor, courseType } = course;
                return (
                  <Grid xs={6} md={4} item key={id}>
                    <Item variant="outlined">
                      <h3>Name: {name}</h3>
                      <h3>Professor: {professor}</h3>
                      <h3>Course Type: {courseType} </h3>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}
