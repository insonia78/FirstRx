import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
const typeDefs  = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({ typeDefs, resolvers,playground:true});
//import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.all('*', async (req:any, res:any) => {
  throw new Error();
});

//app.use(errorHandler);

export { app };
