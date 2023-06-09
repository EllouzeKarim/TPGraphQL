import { GraphQLError } from "graphql";


export const Mutation = {
  createCV: (parent:never, { input }:any, { pubSub, db }) => {
    const { name, age, job, skillIds, user } = input;
    const id = db.cvs.length + 1;
    const skills = db.skills.filter((skill) => skillIds.includes(skill.id));
 
    const user1 = db.users.find((user1) => user1.id === user);
    if (!user1) {
      throw new GraphQLError (`user d'id ${user} n'existe pas`);
    }

    const newCV = {
      id,
      name,
      age,
      job,
      skills,
      user,
    };
    db.cvs.push(newCV);

    pubSub.publish('CVUpdates', newCV);
    return newCV;
  },
  updateCV: (parent:any, { id, input }:any, { pubSub, db }) => {
    const {  skillIds, userId } = input;
    const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new GraphQLError(`cv d'id ${id} n'existe pas.`);
    }
    let cv = db.cvs[cvIndex];
    console.log("cv ",cv);

    let newSkills =[]
    if ( skillIds )
    { 
      newSkills = db.skills.filter((skill) => skillIds.includes(skill.id));
      cv.skills = newSkills;
    }
      
    if ( userId)
      {
        const user = db.users.find((user) => user.id === userId);
      if (!user) {
      throw new GraphQLError(`user d'id ${userId} n'existe pas.`);
      }
    
    }
    for(let key in input){
      if( key != skillIds )
        cv[key] = input[key];

    }
    pubSub.publish('CVUpdates', cv );
    return cv;
  },
  deleteCV: (parent:any, { id }: { id: number }, { db, pubSub }) => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new GraphQLError(`CV with ID ${id} not found`);
    }
    const deletedCV = db.cvs.splice(index, 1)[0];


    db.skills.forEach((cvSkill) => {
      if (cvSkill.id === id) {
        const skillIndex = db.skills.findIndex((skill) => skill.id === cvSkill.id);
        if (skillIndex !== -1) {
          db.skills[skillIndex].cvs = db.skills[skillIndex].cvs.filter((cv) => cv.id !== id);
        }
      }
    });
    db.skills = db.skills.filter((cvSkill) => cvSkill.id !== id);

    const userIndex = db.users.findIndex((user) => user.id === deletedCV.user.id);
    if (userIndex !== -1) {
      db.users[userIndex].cvs = db.users[userIndex].cvs.filter((cv) => cv.id !== id);
    }

    pubSub.publish('CVUpdates', deletedCV);
    return true;
  }
}


