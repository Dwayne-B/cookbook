import axios from 'axios'
import * as dotenv from 'dotenv';
const getEdamam = async (req, res, next) => {

  // console.log("edamam");


  const options2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
      "app_id": `${process.env.APP_ID}`
    }
    , gzip: true,
    compress: true,
    agent: null,
  }

  var url2 = `https://api.edamam.com/api/recipes/v2/?type=public&q=pasta&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;


  const data = await axios(url2, options2)
    .then(json => {
      // res.locals.data = json.hits
      console.log(json.data)

      res.json(json.data);
    })
    .catch(err => console.error('error:' + err));


}
export default getEdamam