import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

export default function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [userId, setUserId] = useState(0);

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="User Id"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={() => {
            deleteUser({
              variables: {
                id: Number(userId),
              },
            });
            refetch();
          }}
        >
          Delete User
        </button>
      </div>
      <h1>Users:</h1>
      {data.users &&
        data.users.map((user) => {
          const { name, age, username, id } = user;
          return (
            <div key={id}>
              <h3>Name: {name}</h3>
              <h3>Id: {id}</h3>
              <h3>Username: {username}</h3>
              <h3>Age: {age}</h3>
            </div>
          );
        })}
      <h1>Movies:</h1>
      {movieData &&
        movieData.movies.map((movie) => {
          const { name, id, yearOfPublication } = movie;
          return (
            <div key={id}>
              <h3>Name: {name}</h3>
              <h3>Year of Publication: {yearOfPublication}</h3>
            </div>
          );
        })}
      <div>
        <input
          type="text"
          placeholder="Interstellar"
          onChange={(e) => {
            setMovieSearched(e.target.value);
          }}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h3>Movie Name: {movieSearchedData.movie.name}</h3>
              <h3>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </h3>
            </div>
          )}
          {movieSearchedError && <h2>There was an error fetching the movie</h2>}
        </div>
      </div>
    </div>
  );
}
