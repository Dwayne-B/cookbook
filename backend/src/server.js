import cors from 'cors';
import * as dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import getEdamam from './middleware/GetEdamam.js';
import apiRouter from "./routes/api.js";
import edamamRouter from './routes/edamamApi.js';
if (process.env.NODE_ENV !== "prod") {
  dotenv.config();
}
// serverAPIversion specifies version of API being used
const PORT = process.env.PORT || 5231
const app = express();
app.use(cors("*"));
const password = process.env.PASS;
const user = process.env.USER_NAME

const uri = `mongodb+srv://${user}:${password}@cluster0.ey7myir.mongodb.net/?retryWrites=true&w=majority`;
// conntect to DB


const connectDB = async () => {
  try {
    await mongoose.connect(uri).then(() => {

      console.log('db connected')
      //after connecting to DB start server 
      app.listen(PORT, () => {

        console.log("server listening on " + PORT)
      });


    })
  } catch (error) {
    console.error("issues with connecting to DB" + error)
  }
}

//include middleware to parse JSON
app.use(express.json());
// This allows Cross-Origin Requests to our server
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * get recipes from 3rd party API
 */


app.use('/edamamApi', edamamRouter);
app.use('/', getEdamam)
/** 
 * all users can interact with CRUD API
 * this piece of middleware on this specific route allows access to CRUD operations.
 * */
app.use("/api", apiRouter);


/*
**Add error handling middleware for API routes and non api routes
** []COMPLETE [x]IN PROGRESS 
*/


// express error handler
import errorHandler from "./error.js";
app.use((req, res, next) => {
  console.log("404 erro handling middleware")
  next()
}, errorHandler);



// function calls
connectDB();
