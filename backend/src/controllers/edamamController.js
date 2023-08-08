

const searchEdemam = async (req, res, next) => {

  // console.log(req.body);


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

  var url2 = `https://api.edamam.com/api/recipes/v2/?type=public&q=${req.body.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
  // console.log(url2);


  const data = await fetch(url2, options2)
    .then(res => res.json())
    .then(json => {

      // console.log('POST', json.hits, "endPOST", json)

      res.json(json.hits);
    })
    .catch(err => console.error('error:' + err));


}

export default searchEdemam