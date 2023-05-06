export const  CV= {
        user: ({user}, _, {db}) => {
            return db.users.find((user1) => user1.id === user);
        },
        skills: ({skills}, args, { db }) => {
            return skills;
        },
    }
