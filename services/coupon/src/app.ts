import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
//import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.get('/healthcheck',async (req:any, res:any) => {
  res.status(200).end();
 //throw new Error();
});
app.all('*', async (req:any, res:any) => {
  throw new Error();
});

//app.use(errorHandler);

export { app };
