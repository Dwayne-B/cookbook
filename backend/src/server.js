import cors from 'cors';
import * as dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import apiRouter from "./routes/api.js";
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
app.use('/', async (req, res, next) => {

  console.log("edamam");
  const app_id = "2f7f65d7";
  const app_key = "06c0d1436fd1ffbf3cfc3ebda9042f5a";
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2a8e34113dmsh3ce3e6dbdec0342p1bc084jsn7ed67fce9440',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  }
  const options2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
      "app_id": `${app_id}`
    }
    , gzip: true,
    compress: true,
    agent: null,
  }
  var urlTest = 'https://edamam-recipe-search.p.rapidapi.com/search?q=chicken'
  var url2 = `https://api.edamam.com/api/recipes/v2/?type=public&q=pasta&app_id=${app_id}&app_key=${app_key}`;
  console.log(url2);

  // const data = await fetch(urlTest, options)
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log(json)

  //     res.json(json)
  //   })
  //   .catch(err => console.error('error:' + err));
  // test
  const data = await fetch(url2, options2)
    .then(res => res.json())
    .then(json => {
      res.locals.data = json.hits
      // console.log(json.hits)

      next()
    })
    .catch(err => console.error('error:' + err));


})

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
