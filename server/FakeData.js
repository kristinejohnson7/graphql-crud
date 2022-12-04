const UserList = [
  {
    id: 1,
    name: "Harry Potter",
    username: "hp",
    age: 30,
    house: "GRYFFINDOR",
    friends: [
      {
        id: 2,
        name: "Draco Malfoy",
        userName: "malfoy",
        age: 30,
        house: "SLYTHERIN",
      },
    ],
  },
  {
    id: 2,
    name: "Ronald Weasley",
    username: "ron",
    age: 30,
    house: "GRYFFINDOR",
  },
];

const CourseList = [
  {
    id: 1,
    name: "Astronomy",
    professor: "Aurora Sinistra",
    courseType: "Core",
    currentlyOffered: true,
  },
  {
    id: 2,
    name: "Charms",
    professor: "Filius Filtwick",
    courseType: "Core",
    currentlyOffered: true,
  },
];

module.exports = { UserList, CourseList };
