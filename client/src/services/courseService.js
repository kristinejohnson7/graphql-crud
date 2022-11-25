import { gql } from "@apollo/client";

export const QUERY_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      name
      professor
      courseType
      currentlyOffered
    }
  }
`;

export const GET_COURSE_BY_NAME = gql`
  query Course($name: String!) {
    course(name: $name) {
      name
      professor
    }
  }
`;
