
import axios from 'axios'
const searchEdemam = async (req, res, next) => {
  console.log("REQ", req.body);
  const options2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
      "app_id": `${process.env.APP_ID}`
    }
    , 
    gzip: true,
    compress: true,
    agent: null,
  }

  var url2 = `https://api.edamam.com/api/recipes/v2/?type=public&q=${req.body.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
  const data = await axios(url2, options2)
    .then(json => {

 console.log("recipe",json.data.hits)
      res.json(json.data);
    })
    .catch(err => {
      console.error('error:' + err)
      next();
    });
   

}

export default searchEdemam