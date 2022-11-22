const UserList = [
  {
    id: 1,
    name: "Kristine",
    username: "kay",
    age: 30,
    house: "RAVENCLAW",
    friends: [
      {
        id: 2,
        name: "Santa",
        userName: "Claus",
        age: 310,
        house: "SLYTHERIN",
      },
    ],
  },
  {
    id: 2,
    name: "Santa",
    username: "Claus",
    age: 310,
    house: "SLYTHERIN",
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
