//EVERY REQUEST TO THE BACKEND SERVER WILL FIRST COME TO app.js FILE

//THEN IT GOES TO ROUTES AND THEN TO CONTROLLERS.

//ROUTES CHECKS THE ADDRESS(URL PATH) AND METHOD(GET,POST,PUT,DELETE) OF THE REQUEST

//CONTROLLER DOES THE TASK(FETCHING,SAVING,DELETING ETC) ASKED IN THE REQUEST



import express from "express";  
const app = express();//create an express application instance

app.use(express.json());//middleware to parse json request body

//routes import
import userRouter from "./routes/user.route.js";//importing user routes



//routes declaration
app.use("/api/v1/users",userRouter);// all routes related to users will be prefixed with /api/v1/users


//example route :http://localhost:4000/api/v1/users/register 

export default app;