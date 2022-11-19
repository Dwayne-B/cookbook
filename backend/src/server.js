import express from "express";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";

// serverAPIversion specifies version of API being used

const PORT = 3000 || process.env.PORT
const app = express();

const password = "password123!";
const user = "dbynum"
const client = null;
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
/** 
 * all users can interact with CRUD API
 * this piece of middleware on this specific route allows access to CRUD operations.
 * */
app.use("/api", apiRouter);




// function calls
connectDB();
