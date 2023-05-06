import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import { Mutation } from './resolvers/Mutation'
import { Query } from './resolvers/Query'
import { Subscription } from './subscriptions'
import { CV } from './resolvers/CV'
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname,"schemas/schema.graphql"),"utf-8"),
  resolvers: {
    CV,
    Query,
    Mutation,
    Subscription
  }
})