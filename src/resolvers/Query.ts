import { GraphQLError } from "graphql";

export const Query = {
    cvs: (_, __, { db }) => {

        return db.cvs;
    },
    cvById: (_, { id }, { db }) => {
      
        const foundCV = db.cvs.find((cv) => cv.id === id);
        if (!foundCV) throw new GraphQLError("CV not found");
        return foundCV;
    },

}

