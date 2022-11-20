const UserList = [
  {
    id: 1,
    name: "Kristine",
    username: "kay",
    age: 30,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Santa",
        userName: "Claus",
        age: 310,
        nationality: "ALASKA",
      },
    ],
  },
  {
    id: 2,
    name: "Santa",
    username: "Claus",
    age: 310,
    nationality: "ALASKA",
  },
];

const MovieList = [
  {
    id: 1,
    name: "Avengers Endgame",
    yearOfPublication: 2019,
    isInTheaters: true,
  },
  {
    id: 2,
    name: "Interstellar",
    yearOfPublication: 2007,
    isInTheaters: false,
  },
];

module.exports = { UserList, MovieList };
