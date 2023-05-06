// interface IdentifiableById {
//   id: number;
// }
//
// interface CV extends IdentifiableById {
//   name: string;
//   age: string;
//   job: string;
//   skills: Skill[];
//   user: number;
// }
//
// interface Skill extends IdentifiableById {
//   designation: string;
//   }
//
// interface User extends IdentifiableById {
//   name: string;
//   email: string;
//   role: Role;
//
// }

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

const skills= [
  { id: 1, designation: "d1"},
  { id: 2, designation: "d2"},
  { id: 3, designation: "d3" },
  { id: 4, designation: "d4"},
];

const users= [
            {
                id:1,
                name:"user1",
                email:"user1@email",
                role:Role.ADMIN
            },
            {
                id:2,
                name:"user2",
                email:"user2@email",
                role:Role.USER
            },
            {
                id:3,
                name:"user3",
                email:"user3@email",
                role:Role.USER
            }
        ];

const cvs = [
  {
    id: 1,
    name: "cv1",
    age: "21",
    job: "job1",
    skills: [skills[0]],
    user: 1,
  },
  {
    id: 2,
    name: "cv2",
    age: "20",
    job: "job2",
    skills: [skills[1]],
    user: 2,
  },
  {
    id: 3,
    name: "cv3",
    age: "21",
    job: "job3",
    skills:[skills[0],skills[2]],
    user: 3,
},
{
    id: 4 ,
    name: "cv4",
    age: "22",
    job: "job4",
    skills:[skills[3]],
    user: 3,
},

];


export const db = {
  skills,
  users,
  cvs,
};
