import express from "express";

const app = express(); //create an express App

app.use(express.json());


//routes import

import userRouter from './routes/user.route.js';


//routes declaration

app.use("/api/v1/users", userRouter);

//ex route: http://localhost:4000/api/v1/users/register


export default app;

